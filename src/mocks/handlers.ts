import { rest } from 'msw';
import _now from 'lodash/now';

export const handlers = [
  rest.post('https://oauth2.googleapis.com/token', (req, res, ctx) => {
    const jwtToken = req.url.searchParams.get('assertion');

    if (jwtToken === 'bad_token') {
      return res(
        ctx.status(400),
      );
    }

    return res(
      // Respond with a 200 status code
      ctx.status(200),
      ctx.json({
        access_token: 'auth_token',
      }),
    );
  }),
  rest.get('https://sheets.googleapis.com/v4/spreadsheets/:spreadsheet_id', (req, res, ctx) => res(
    // Respond with a 200 status code
    ctx.status(200),
    ctx.json({
      sheets: [
        {
          properties: {
            title: 'test_account@gmail.com',
            sheetId: '123456789',
          },
        },
        {
          properties: {
            title: 'another_test_account@gmail.com',
            sheetId: '987654321',
          },
        },
      ],
    }),
  )),
  rest.post('https://sheets.googleapis.com/v4/spreadsheets/:spreadsheet_id\\:batchUpdate', async (req, res, ctx) => {
    const body = await req.json();
    return res(
      // Respond with a 200 status code
      ctx.status(200),
      ctx.json({
        replies: [
          {
            addSheet: {
              properties: {
                title: body.requests[0].addSheet.properties.title,
                sheetId: '654987123',
              },
            },
          },
        ],
      }),
    );
  }),
  rest.post('https://sheets.googleapis.com/v4/spreadsheets/:spreadsheet_id/values\\:batchGetByDataFilter', async (req, res, ctx) => {
    const body = await req.json();
    if (body.dataFilters[0].gridRange.sheetId === '123456789') {
      return res(
        // Respond with a 200 status code
        ctx.status(200),
        ctx.json({
          valueRanges: [
            {
              valueRange: {
                values:
                  [['mhrs-talismans', JSON.stringify({
                    talismans: [
                      {
                        skill1: {
                          id: 'speed-sharpening', type: 'battle-swordsman', levelMaximum: 3, foundOnTalismans: true, decorations: [{ id: 'grinder-jewel-2', requiredSlot: 1, skillPoints: 1 }, { id: 'grinder-jewel-4', requiredSlot: 4, skillPoints: 3 }],
                        },
                        skill1Level: 2,
                        skill2: null,
                        skill2Level: null,
                        slots: {
                          id: '2-0-0', slot1: 2, slot2: 0, slot3: 0,
                        },
                        forMelding: false,
                        favorite: true,
                        weight: 0,
                      }, {
                        skill1: {
                          id: 'blast-resistance', type: 'stats-defensive', levelMaximum: 3, foundOnTalismans: true, decorations: [{ id: 'antiblast-jewel-1', requiredSlot: 1, skillPoints: 1 }],
                        },
                        skill1Level: 2,
                        skill2: null,
                        skill2Level: null,
                        slots: {
                          id: '1-1-0', slot1: 1, slot2: 1, slot3: 0,
                        },
                        forMelding: true,
                        favorite: false,
                        weight: 0,
                      }, {
                        skill1: {
                          id: 'bombardier', type: 'item', levelMaximum: 3, foundOnTalismans: true, decorations: [{ id: 'bomber-jewel-1', requiredSlot: 1, skillPoints: 1 }, { id: 'bomber-jewel-4', requiredSlot: 4, skillPoints: 3 }],
                        },
                        skill1Level: 2,
                        skill2: {
                          id: 'paralysis-resistance', type: 'stats-defensive', levelMaximum: 3, foundOnTalismans: true, decorations: [{ id: 'antipara-jewel-1', requiredSlot: 1, skillPoints: 1 }],
                        },
                        skill2Level: 1,
                        slots: {
                          id: '1-0-0', slot1: 1, slot2: 0, slot3: 0,
                        },
                        forMelding: false,
                        favorite: true,
                        weight: 0,
                      },
                    ],
                    updatedAt: _now(),
                  })]],
              },
            },
          ],
        }),
      );
    }

    return res(
      ctx.status(400),
    );
  }),
  rest.post('https://sheets.googleapis.com/v4/spreadsheets/:spreadsheet_id/values\\:batchUpdateByDataFilter', async (req, res, ctx) => res(
    // Respond with a 200 status code
    ctx.status(200),
    ctx.json({
      responses: [
        {
          dataFilter: {
            gridRange: { sheetId: 123456789 },
          },
          updatedCells: 2,
          updatedColumns: 2,
          updatedRange: "'test_account@gmail.com'!A1:B1",
          updatedRows: 1,
        },
      ],
    }),
  )),
];
