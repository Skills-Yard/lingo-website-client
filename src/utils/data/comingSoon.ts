export const TAB_CONTENT = {
  home: {
    title: "Daily Learning Hub",
    badge: "Dashboard",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800",
    mascotVariant: "study" as const,
    description: "We are building a center for your daily goals. Keep track of your streaks, complete daily quests, compete with friends, and review your mistakes in one single screen.",
    bgGradient: "bg-background",
    primaryButtonBg: "bg-[#059669] hover:bg-[#047857] dark:bg-[#10b981] dark:hover:bg-[#059669] text-white",
    statsPreview: [
      { label: "Daily Quests", value: "3 Active" },
      { label: "Streaks Hub", value: "Locked" },
      { label: "XP Multiplier", value: "Ready" }
    ]
  },
  premium: {
    title: "Lingo Premium",
    badge: "Supercharge",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800",
    mascotVariant: "coding" as const,
    description: "Unlock the full potential of your coding journey! Get unlimited hearts, completely ad-free lessons, personalized practice, and exclusive certificate badges upon course completion.",
    bgGradient: "bg-background",
    primaryButtonBg: "bg-amber-500 hover:bg-amber-600 text-white",
    statsPreview: [
      { label: "Hearts", value: "∞ Unlimited" },
      { label: "Ad-free Mode", value: "Active" },
      { label: "Certificates", value: "Included" }
    ]
  },
  you: {
    title: "Your Learning Profile",
    badge: "Progress",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800",
    mascotVariant: "study" as const,
    description: "Your personalized statistics arena. Track your minutes spent coding, total lines of logic verified, unlock trophies for milestones, and show off your achievements on the global leaderboard.",
    bgGradient: "bg-background",
    primaryButtonBg: "bg-[#059669] hover:bg-[#047857] dark:bg-[#10b981] dark:hover:bg-[#059669] text-white",
    statsPreview: [
      { label: "Total Code Runs", value: "Locked" },
      { label: "Completed Lessons", value: "0" },
      { label: "Trophy Count", value: "0 / 12" }
    ]
  }
};