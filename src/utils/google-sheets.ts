import { GoogleCredentials, googleAuthApi, googleSheetsApi } from 'boot/google-api';
import { importPKCS8, SignJWT } from 'jose';
import _isEmpty from 'lodash/isEmpty';

export interface GoogleSheetsApiConstructor {
  serviceAccountCredentials: GoogleCredentials;
  spreadSheetId: string;
}

/**
 * Helper class to manage Google Sheets API
 * https://developers.google.com/sheets/api/reference/rest
 */
export class GoogleSheets {
  accessToken: string;

  serviceAccountCredentials: GoogleCredentials;

  spreadSheetId: string;

  constructor({ serviceAccountCredentials, spreadSheetId }: GoogleSheetsApiConstructor) {
    this.accessToken = '';
    this.serviceAccountCredentials = serviceAccountCredentials;
    this.spreadSheetId = spreadSheetId;
  }

  /**
   * Used to get access token from service account credentials
   * @private
   */
  private async obtainAccessToken() {
    const privateKey = await importPKCS8(this.serviceAccountCredentials.private_key, 'RS256');
    const jwt = await new SignJWT({
      scope: 'https://www.googleapis.com/auth/spreadsheets',
    })
      .setProtectedHeader({ alg: 'RS256' })
      .setIssuedAt()
      .setIssuer(this.serviceAccountCredentials.client_email)
      .setExpirationTime('1h')
      .setAudience(this.serviceAccountCredentials.token_uri)
      .sign(privateKey);

    const response = await googleAuthApi.post('/token', null, {
      params: {
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: jwt,
      },
    });
    this.accessToken = response.data.access_token;
  }

  /**
   * Used to prepare headers Authorization.
   * @private
   */
  private getRequestConfig() {
    return {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    };
  }

  /**
   * Return Spreadsheet data, mostly used to get sheets data.
   */
  async getSpreadsheet() {
    if (_isEmpty(this.accessToken)) {
      await this.obtainAccessToken();
    }

    const response = await googleSheetsApi.get(`/v4/spreadsheets/${this.spreadSheetId}`, this.getRequestConfig());

    return response.data;
  }

  /**
   * Create a new sheet.
   * @param title Sheet title
   */
  async createSheet(title: string) {
    if (_isEmpty(this.accessToken)) {
      await this.obtainAccessToken();
    }

    const requestData = {
      requests: [
        {
          addSheet: {
            properties: { title },
          },
        },
      ],
    };
    const response = await googleSheetsApi.post(`/v4/spreadsheets/${this.spreadSheetId}:batchUpdate`, requestData, this.getRequestConfig());

    return response.data.replies[0].addSheet.properties;
  }

  /**
   * Return all Sheet values
   * @param sheetId Sheet ID
   */
  async getSheetValues(sheetId: string) {
    if (_isEmpty(this.accessToken)) {
      await this.obtainAccessToken();
    }

    const requestData = {
      dataFilters: [
        {
          gridRange: { sheetId },
        },
      ],
    };

    const response = await googleSheetsApi.post(`/v4/spreadsheets/${this.spreadSheetId}/values:batchGetByDataFilter`, requestData, this.getRequestConfig());

    return response.data.valueRanges[0].valueRange.values;
  }

  /**
   * Update sheets values, replace with new ones.
   * @param sheetId Sheet ID
   * @param values New values for sheet
   */
  async updateSheetValues(sheetId: string, values: [(string)[]]) {
    if (_isEmpty(this.accessToken)) {
      await this.obtainAccessToken();
    }

    const requestData = {
      valueInputOption: 'RAW',
      data: [
        {
          values,
          dataFilter: {
            gridRange: { sheetId },
          },
        },
      ],
    };
    const response = await googleSheetsApi.post(`/v4/spreadsheets/${this.spreadSheetId}/values:batchUpdateByDataFilter`, requestData, this.getRequestConfig());

    return response.data.responses[0];
  }
}
