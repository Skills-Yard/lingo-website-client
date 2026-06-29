export const TAB_CONTENT = {
    home: {
        title: "Daily Learning Hub",
        badge: "Dashboard",
        badgeColor: "bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-900",
        mascotVariant: "study" as const,
        description: "We are building a center for your daily goals. Keep track of your streaks, complete daily quests, compete with friends, and review your mistakes in one single screen.",
        bgGradient: "from-sky-100/70 via-indigo-50/50 to-yellow-50/30 dark:from-slate-950 dark:via-indigo-950/20 dark:to-slate-900",
        primaryButtonBg: "bg-indigo-600 border-indigo-800 hover:bg-indigo-500 text-white",
        statsPreview: [
            { label: "Daily Quests", value: "3 Active" },
            { label: "Streaks Hub", value: "Locked" },
            { label: "XP Multiplier", value: "Ready" }
        ]
    },
    premium: {
        title: "Lingo Premium",
        badge: "Supercharge",
        badgeColor: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-900",
        mascotVariant: "coding" as const,
        description: "Unlock the full potential of your coding journey! Get unlimited hearts, completely ad-free lessons, personalized practice, and exclusive certificate badges upon course completion.",
        bgGradient: "from-amber-100/60 via-purple-50/40 to-sky-50/30 dark:from-slate-950 dark:via-purple-950/20 dark:to-slate-900",
        primaryButtonBg: "bg-amber-500 border-amber-700 hover:bg-amber-400 text-slate-950",
        statsPreview: [
            { label: "Hearts", value: "∞ Unlimited" },
            { label: "Ad-free Mode", value: "Active" },
            { label: "Certificates", value: "Included" }
        ]
    },
    you: {
        title: "Your Learning Profile",
        badge: "Progress",
        badgeColor: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900",
        mascotVariant: "study" as const,
        description: "Your personalized statistics arena. Track your minutes spent coding, total lines of logic verified, unlock trophies for milestones, and show off your achievements on the global leaderboard.",
        bgGradient: "from-emerald-100/60 via-teal-50/40 to-yellow-50/30 dark:from-slate-950 dark:via-emerald-950/20 dark:to-slate-900",
        primaryButtonBg: "bg-emerald-600 border-emerald-800 hover:bg-emerald-500 text-white",
        statsPreview: [
            { label: "Total Code Runs", value: "Locked" },
            { label: "Completed Lessons", value: "0" },
            { label: "Trophy Count", value: "0 / 12" }
        ]
    }
};