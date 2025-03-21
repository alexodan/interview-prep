import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { PracticeSession } from '@/app/practice/types'

const DATA_FILE_PATH = path.join(process.cwd(), 'app/practice/data/practice-sessions.json')

async function readSessionsFile() {
  try {
    const data = await fs.readFile(DATA_FILE_PATH, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    // If file doesn't exist, create it with empty sessions array
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify({ sessions: [] }))
    return { sessions: [] }
  }
}

export async function GET() {
  try {
    const data = await readSessionsFile()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch practice sessions' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const data = await readSessionsFile()
    const newSession = await request.json()
    
    data.sessions.push(newSession)
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2))
    
    return NextResponse.json(newSession)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to save practice session' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const data = await readSessionsFile()
    const { id, updates } = await request.json()
    
    data.sessions = data.sessions.map((session: PracticeSession) =>
      session.id === id ? { ...session, ...updates } : session
    )
    
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2))
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update practice session' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const data = await readSessionsFile()
    const { id } = await request.json()
    
    data.sessions = data.sessions.filter(
      (session: PracticeSession) => session.id !== id
    )
    
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2))
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete practice session' },
      { status: 500 }
    )
  }
}
