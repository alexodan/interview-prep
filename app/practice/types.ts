export type PracticeSession = {
  id: string
  title: string
  description: string
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
  duration: number
  language: string
  status: 'solved' | 'unsolved' | 'review'
  notes: string
  createdAt: string
}
