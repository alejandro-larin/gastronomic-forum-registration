import { google } from 'googleapis'
import { NextRequest, NextResponse } from 'next/server'

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

function getAuth() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')

  return new google.auth.GoogleAuth({
    credentials: {
      client_email: email,
      private_key: key,
    },
    scopes: SCOPES,
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { nombre, empresa, cargo, distrito, email, telefono } = body

    if (!nombre || !empresa || !cargo || !distrito || !email || !telefono) {
      return NextResponse.json({ error: 'Todos los campos son requeridos' }, { status: 400 })
    }

    const auth = getAuth()
    const sheets = google.sheets({ version: 'v4', auth })

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
      range: 'Hoja 1!A:G',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[nombre, empresa, cargo, distrito, email, telefono, new Date().toISOString()]],
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error guardando en Google Sheets:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
