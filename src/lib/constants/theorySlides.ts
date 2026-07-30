import { TheorySlideType } from '../../utils/types';

export const THEORY_SLIDES: TheorySlideType[] = [
  {
    title: "Welcome to Programming!",
    text: "Computers are super powerful, but they aren't smart enough to work on their own. They need us to tell them exactly what to do using special rules and code.",
    instruction: "Let's learn how to speak the computer's language!",
    hasQuiz: false,
  },
  {
    title: "What is Programming?",
    text: "Programming is all about giving commands to a computer. A command is a clear instruction to do a specific action.",
    instruction: "The computer follows your commands exactly!",
    hasQuiz: false,
    showCommandsIllustration: true,
  },
  {
    title: "Which command will turn the robot left?",
    text: "Look at the direction indicator and choose the command that helps Lumi turn left.",
    options: [
      { text: "Go Straight", isCorrect: false, commandType: "straight", explanation: "Go Straight moves the robot forward one tile. It doesn't rotate the robot, so it will not turn it left." },
      { text: "Turn Left", isCorrect: true, commandType: "left", explanation: "Turn Left rotates the robot 90 degrees counter-clockwise to face its left side." },
      { text: "Turn Right", isCorrect: false, commandType: "right", explanation: "Turn Right rotates the robot 90 degrees clockwise, which makes it face right instead of left." },
      { text: "Pick Up", isCorrect: false, commandType: "pickup", explanation: "Pick Up collects items at the robot's current position. It does not rotate or change the robot's direction." },
    ],
    hasQuiz: true,
    imageSrc: "/images/turn_left_quiz.png",
    explanation: {
      correctTitle: "Great choice!",
      incorrectTitle: "Not quite!",
      rememberText: "Every command has a specific action.",
    },
  },
  {
    title: "Test Your Knowledge!",
    text: "Select the correct answer to continue.",
    question: "What is a 'command' in programming?",
    options: [
      { text: "A special instruction we give to a computer to do a specific action.", isCorrect: true, explanation: "Correct! A command is a clear instruction code that tells the computer exactly what action to perform." },
      { text: "A hardware device used to power up Lumi's screen.", isCorrect: false, explanation: "Incorrect. Physical screens or buttons are Hardware. A command is a software instruction in code." },
      { text: "The name of a programmer's computer monitor.", isCorrect: false, explanation: "Incorrect. A monitor is physical hardware. A command is an instruction that controls program actions." },
    ],
    hasQuiz: true,
    explanation: {
      correctTitle: "Great choice!",
      incorrectTitle: "Let's review!",
      rememberText: "Computers need clear commands to execute any action.",
    },
  },
  {
    title: "Which command will pick up the star?",
    text: "Look at Lumi standing on the star. Choose the command that picks it up.",
    options: [
      { text: "Go Straight", isCorrect: false, commandType: "straight", explanation: "Go Straight moves the robot forward. It does not collect items." },
      { text: "Turn Left", isCorrect: false, commandType: "left", explanation: "Turn Left rotates the robot left. It does not pick up items." },
      { text: "Turn Right", isCorrect: false, commandType: "right", explanation: "Turn Right rotates the robot right. It does not pick up items." },
      { text: "Pick Up", isCorrect: true, commandType: "pickup", explanation: "Correct! Pick Up instructs the robot to collect items (like stars or flags) on its current tile." },
    ],
    hasQuiz: true,
    imageSrc: "/images/pickup_quiz.png",
    explanation: {
      correctTitle: "Awesome job!",
      incorrectTitle: "Try again!",
      rememberText: "Use Pick Up when you want to collect targets on the platform.",
    },
  },
  {
    title: "Order Matters!",
    text: "A computer runs commands step-by-step, in the exact order you write them. This ordered list of commands is called a Program!",
    instruction: "If the order is wrong, the program won't work correctly!",
    hasQuiz: false,
  },
  {
    title: "Brush Your Teeth!",
    text: "Let's put the steps of brushing your teeth in the correct sequence.",
    question: "Which sequence is correct?",
    options: [
      { text: "1. Put toothpaste on brush ➔ 2. Brush teeth ➔ 3. Rinse mouth", isCorrect: true, explanation: "Correct! Putting toothpaste, then brushing, and then rinsing is the logical sequence of steps." },
      { text: "1. Rinse mouth ➔ 2. Brush teeth ➔ 3. Put toothpaste on brush", isCorrect: false, explanation: "Incorrect. You shouldn't rinse your mouth before brushing or putting toothpaste on the brush!" },
      { text: "1. Brush teeth ➔ 2. Rinse mouth ➔ 3. Put toothpaste on brush", isCorrect: false, explanation: "Incorrect. You can't brush your teeth without toothpaste first, and rinsing is always done at the end." },
    ],
    hasQuiz: true,
    explanation: {
      correctTitle: "Perfect sequence!",
      incorrectTitle: "Not quite!",
      rememberText: "A program runs commands step-by-step in the exact order you write them.",
    },
  },
  {
    title: "Ready to Program!",
    text: "Awesome job! You've learned that programming is giving step-by-step commands to a computer. Now let's help Lumi navigate platforms!",
    instruction: "Click Continue to unlock the Commands level and start programming!",
    hasQuiz: false,
    isEnd: true,
  },
];
