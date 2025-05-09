"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useAuth } from "@/components/auth-provider"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StudentCharacterAdvanced } from "@/components/student-character-advanced"
import { SubscriptionBanner } from "@/components/subscription-banner"
import { suggestMagicBoxItem, analyzeTeamMatch } from "@/components/ai-models"
import {
  CalendarDays,
  BookOpen,
  Zap,
  Users,
  Sparkles,
  MessageSquare,
  Brain,
  Briefcase,
  Heart,
  Code,
} from "lucide-react"

export default function DashboardPage() {
  const { user, updateUserJournal, addMagicBoxSurprise, completeMagicBoxSurprise } = useAuth()
  const [journalEntry, setJournalEntry] = useState("")
  const [magicBoxItem, setMagicBoxItem] = useState(null)
  const [teamMatches, setTeamMatches] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      // Simulate API calls
      setTimeout(() => {
        setMagicBoxItem(suggestMagicBoxItem(user))
        setTeamMatches(analyzeTeamMatch(user))
        setLoading(false)
      }, 1000)
    }
  }, [user])

  const handleJournalSubmit = (e) => {
    e.preventDefault()
    if (!journalEntry.trim()) return

    const newEntry = {
      date: new Date().toISOString().split("T")[0],
      content: journalEntry,
      mood: user?.mood || "neutral",
      aiInsight: "Reflecting on your experiences shows growth mindset. Keep building this habit!",
    }

    updateUserJournal(newEntry)
    setJournalEntry("")
  }

  const handleMagicBoxComplete = () => {
    if (magicBoxItem) {
      completeMagicBoxSurprise(new Date().toISOString().split("T")[0])
      addMagicBoxSurprise({
        date: new Date().toISOString().split("T")[0],
        surprise: magicBoxItem.title,
        completed: true,
      })
      // Refresh magic box item
      setMagicBoxItem(suggestMagicBoxItem(user))
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold">Please log in to view your dashboard</h1>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Add subscription banner */}
          <SubscriptionBanner />

          {/* Dashboard header */}
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="w-40 h-40 relative">
              <StudentCharacterAdvanced mood={user.mood} />
            </div>

            <div className="space-y-2 text-center md:text-left">
              <h1 className="text-3xl font-bold">Welcome back, {user.name}!</h1>
              <p className="text-muted-foreground">
                Level {user.level} {user.role} • {user.location}
              </p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {user.badges.map((badge) => (
                  <Badge key={badge} variant="secondary">
                    {badge}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="ml-auto space-y-2 w-full md:w-auto">
              <div className="flex justify-between text-sm mb-1">
                <span>Technical XP</span>
                <span>
                  {user.xp}/{user.nextLevelXp}
                </span>
              </div>
              <Progress value={(user.xp / user.nextLevelXp) * 100} className="h-2 w-full md:w-60" />

              <div className="flex justify-between text-sm mb-1">
                <span>Emotional XP</span>
                <span>
                  {user.emotionalXp}/{user.nextLevelXp}
                </span>
              </div>
              <Progress value={(user.emotionalXp / user.nextLevelXp) * 100} className="h-2 w-full md:w-60 bg-muted" />
            </div>
          </div>

          {/* Main dashboard content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left column */}
            <div className="space-y-6">
              {/* AI Mentors card */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    AI Mentors
                  </CardTitle>
                  <CardDescription>Get personalized guidance from specialized mentors</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <Link href="/mentors" className="group">
                      <div className="border rounded-lg p-3 space-y-2 transition-colors hover:bg-muted/50 group-hover:border-primary">
                        <div className="flex justify-center">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <Code className="h-5 w-5 text-primary" />
                          </div>
                        </div>
                        <h3 className="font-medium text-center">Technical</h3>
                      </div>
                    </Link>
                    <Link href="/mentors" className="group">
                      <div className="border rounded-lg p-3 space-y-2 transition-colors hover:bg-muted/50 group-hover:border-primary">
                        <div className="flex justify-center">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <Briefcase className="h-5 w-5 text-primary" />
                          </div>
                        </div>
                        <h3 className="font-medium text-center">Career</h3>
                      </div>
                    </Link>
                    <Link href="/mentors" className="group">
                      <div className="border rounded-lg p-3 space-y-2 transition-colors hover:bg-muted/50 group-hover:border-primary">
                        <div className="flex justify-center">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <Heart className="h-5 w-5 text-primary" />
                          </div>
                        </div>
                        <h3 className="font-medium text-center">Emotional</h3>
                      </div>
                    </Link>
                    <Link href="/mentors" className="group">
                      <div className="border rounded-lg p-3 space-y-2 transition-colors hover:bg-muted/50 group-hover:border-primary">
                        <div className="flex justify-center">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <BookOpen className="h-5 w-5 text-primary" />
                          </div>
                        </div>
                        <h3 className="font-medium text-center">Learning</h3>
                      </div>
                    </Link>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href="/mentors">Explore All Mentors</Link>
                  </Button>
                </CardFooter>
              </Card>

              {/* Magic Box card */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    Magic Box
                  </CardTitle>
                  <CardDescription>Daily surprises to boost your growth</CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="h-40 flex items-center justify-center">
                      <p className="text-muted-foreground">Loading your surprise...</p>
                    </div>
                  ) : magicBoxItem ? (
                    <div className="border rounded-lg p-4 space-y-3">
                      <h3 className="font-medium text-center">{magicBoxItem.title}</h3>
                      <p className="text-sm text-center">{magicBoxItem.description}</p>
                      {magicBoxItem.challenge && (
                        <div className="bg-muted p-3 rounded-md text-sm">
                          <p className="font-medium">Challenge:</p>
                          <p>{magicBoxItem.challenge}</p>
                        </div>
                      )}
                      <div className="flex justify-center">
                        <Badge variant="outline">+{magicBoxItem.xpReward} XP</Badge>
                      </div>
                    </div>
                  ) : (
                    <div className="h-40 flex items-center justify-center">
                      <p className="text-muted-foreground">No surprises available right now.</p>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button className="w-full" disabled={!magicBoxItem} onClick={handleMagicBoxComplete}>
                    Complete Challenge
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Middle column */}
            <div className="space-y-6">
              {/* Journal entry card */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    Daily Journal
                  </CardTitle>
                  <CardDescription>Reflect on your learning journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleJournalSubmit} className="space-y-4">
                    <Textarea
                      placeholder="What did you learn today? How are you feeling about your progress?"
                      className="min-h-[120px]"
                      value={journalEntry}
                      onChange={(e) => setJournalEntry(e.target.value)}
                    />
                    <Button type="submit" className="w-full">
                      Save Journal Entry
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Recent activities */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <CalendarDays className="h-5 w-5 text-primary" />
                    Recent Activities
                  </CardTitle>
                  <CardDescription>Your latest learning activities</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 border-l-2 border-primary pl-3">
                      <div className="bg-primary/10 p-2 rounded-full shrink-0">
                        <Zap className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Completed React Component Challenge</p>
                        <p className="text-sm text-muted-foreground">2 hours ago • +75 XP</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 border-l-2 border-primary/60 pl-3">
                      <div className="bg-primary/10 p-2 rounded-full shrink-0">
                        <MessageSquare className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Journal Entry: Frontend Progress</p>
                        <p className="text-sm text-muted-foreground">Yesterday • +25 XP</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 border-l-2 border-primary/40 pl-3">
                      <div className="bg-primary/10 p-2 rounded-full shrink-0">
                        <Users className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Joined Eco App Hackathon Team</p>
                        <p className="text-sm text-muted-foreground">2 days ago • +50 XP</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Activities
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Right column */}
            <div className="space-y-6">
              {/* Team matches card */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Team Matches
                  </CardTitle>
                  <CardDescription>AI-suggested teammates based on your profile</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {loading ? (
                    <div className="h-40 flex items-center justify-center">
                      <p className="text-muted-foreground">Finding your perfect teammates...</p>
                    </div>
                  ) : teamMatches.length > 0 ? (
                    <div className="space-y-3">
                      {teamMatches.map((match, index) => (
                        <div key={index} className="flex items-center gap-3 border rounded-lg p-3">
                          <Avatar>
                            <AvatarImage src={match.avatar || "/placeholder.svg"} alt={match.name} />
                            <AvatarFallback>{match.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center">
                              <p className="font-medium truncate">{match.name}</p>
                              <Badge variant="outline" className="bg-green-500/10 text-green-600">
                                {match.synergy}% Match
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {match.role} • {match.mbti}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="h-40 flex items-center justify-center">
                      <p className="text-muted-foreground">No team matches available right now.</p>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href="/teams">Find More Teammates</Link>
                  </Button>
                </CardFooter>
              </Card>

              {/* Quick links card */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Quick Links</CardTitle>
                  <CardDescription>Frequently used features</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" asChild className="h-auto py-4 flex flex-col items-center justify-center">
                      <Link href="/career-simulator">
                        <Briefcase className="h-5 w-5 mb-1" />
                        <span>Career Simulator</span>
                      </Link>
                    </Button>
                    <Button variant="outline" asChild className="h-auto py-4 flex flex-col items-center justify-center">
                      <Link href="/skills">
                        <Zap className="h-5 w-5 mb-1" />
                        <span>Skill Tree</span>
                      </Link>
                    </Button>
                    <Button variant="outline" asChild className="h-auto py-4 flex flex-col items-center justify-center">
                      <Link href="/missions">
                        <BookOpen className="h-5 w-5 mb-1" />
                        <span>Missions</span>
                      </Link>
                    </Button>
                    <Button variant="outline" asChild className="h-auto py-4 flex flex-col items-center justify-center">
                      <Link href="/mentors">
                        <Brain className="h-5 w-5 mb-1" />
                        <span>AI Mentors</span>
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
