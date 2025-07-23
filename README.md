# 🐱 Cat Fetching App

A simple React application that fetches cat photos from [The Cat API](https://thecatapi.com/) and displays them in multiple layouts: Grid, Carousel, List, and Cards. Built for a frontend tech assignment, the app demonstrates state management, custom hooks, flexible UI rendering, and unit testing.

---

## 🚀 Tech Stack

- **React + TypeScript**
- **Zustand** for global state
- **Custom Hooks** for API data fetching
- **Layout Switching**: Grid / Carousel / List / Cards
- **React Slick** for carousel slider
- **React Testing Library** + **Vitest** for unit testing
- **CSS Modules** for styling

---

## 🎯 Objectives

- Create a custom hook to fetch cat images from an external API (or mock it).
- Store data in a global state using a preferred method (Zustand used here).
- Allow the user to switch between different view modes:
  - Grid  
  - Carousel  
  - List  
  - Cards  
- Provide smooth toggling between view modes.
- Include unit tests for major components and logic.

---

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or higher)  
- Yarn

### Setup

1. **Clone the repo:**

    ```bash
    git clone https://github.com/your-username/cat-fetching-app.git
    cd cat-fetching-app
    ```

2. **Install dependencies:**

    ```bash
    yarn
    ```

3. **Create a `.env` file in the root directory and add your API key:**

    ```env
    REACT_APP_API_KEY=YOUR_API_KEY
    ```

4. **Start the development server:**

    ```bash
    yarn start
    ```

    The app will run at [http://localhost:3000](http://localhost:3000)

5. **Run tests:**

    ```bash
    yarn test
    ```

---

## 🧪 Testing

Unit tests are written using **Vitest** and **React Testing Library**.  
To run all tests:

```bash
yarn test
```

📦 API

Powered by: The Cat API