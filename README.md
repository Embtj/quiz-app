# Quizzical

A React quiz app built from a Figma design brief by Scrimba, using the Open Trivia Database API. Users need to answer 5 trivia questions with multiple choice answers.

## Features
- Choose between 4 multiple choice answers for each question
- Answers are shuffled randomly each game
- Check answers and get your score
- Visual feedback showing correct/incorrect answers after checking
- Play again without refreshing the page
- Fully keyboard navigable

## Built with
- React
- CSS
- [Open Trivia Database API](https://opentdb.com/)
- clsx
- he (for HTML entity decoding)

## What I Learned
- **Semantic HTML for accessibility**: Refactored from buttons to radio inputs inside a form with fieldset and legend, which provides better screen reader support and keyboard navigation.
- **State management**: Deciding what should live in state vs what can be derived. For example, deriving the score from the results array instead of storing it separately.
- **Async/await and error handling**: Fetching from an external API with proper loading and error states, including handling rate limiting (429 errors).
- **HTML entity decoding**: Using the he library to decode special characters returned by the API.
- **Fisher-Yates shuffle algorithm**: Implementing a uniform shuffle to randomize answer order each game.
- **Focus management**: Using React refs to move focus to the first question when the quiz loads, improving the screen reader experience.

## Live Demo
[View Project](https://spontaneous-platypus-0954b7.netlify.app/)
