# Educational Video Player

## Overview

This repository contains my solution for the Scope Labs Educational Video Player assessment. The application is built using Next.js 15 with TypeScript and MUI, leveraging Next.js's hybrid rendering (server and client components) for optimal performance and SEO.

### Design Document & Sketches

- [**Design Document**](./docs/DESIGN_JOURNEY.md):
  Outlines design motivations, tradeoffs, and decisions made throughout the design and development process.
- [**Sketches**](./docs/sketches/):
  Initial UI sketches for each page.

### Video Walkthrough

A video demonstrating the platforms UI and key features.

[Walkthrough](https://www.loom.com/share/0a986b805ec34504a5e14675c831c6d0?sid=6574594c-65d5-4794-aa10-0316b82c6041)

### Key Features

- **User Authentication:**  
  Simulated login using first and last name, managed via React Context (client-side) with a secure cookie approach for server-side checks and data fetching.

- **Video Dashboard:**  
  A dynamic video dashboard that displays a list of videos in a responsive grid layout, complete with search and sort functionalities (alphabetical, date posted, and number of comments).

- **Video Playback & Editing:**  
  Integrated video playback using `react-player` with full-screen mode, playback speed, and volume controls. Users can edit video details inline and see their changes reflected immediately. The player supports video playback from files, YouTube, Facebook, Twitch, SoundCloud, Streamable, Vimeo, Wistia, Mixcloud, and Kaltura. Read more about platform support in the [React Player docs](https://www.npmjs.com/package/react-player).

- **Video Upload:**  
  A simple and intuitive form for uploading videos with title, description, and URL validation. Video titles and descriptions are validated for profanity before being posted.

- **Commenting System:**  
  Users can post and view comments on videos. The system employs immediate background revalidation to provide a seamless, real-time experience. Comments are validated for profanity before being posted.

- **Global Notification System:**  
  Toast messages using MUI Snackbar and React Context provide user feedback for actions like login/logout, uploads, and edits.

- **Protected Pages:**  
  Client-side and server-side techniques ensure that only authenticated users can access certain pages (e.g., the Video Dashboard and Video Upload).

- **Mobile Responsiveness**:
  All pages and components are fully responsive for use across devices of any screen size.

---

## Build and Run Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/carter-loremdigital/scope-labs-educational-video-player.git
    cd educational-video-player
    ```
2.  Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

3.  Configure Environment Variables:

    Create a `.env` file in the root directory and add the following (replace with your actual API URL):

    ```
    NEXT_PUBLIC_API_URL=https://your-api-url.com/api
    ```

### Running the Application

Run the start command in your terminal:

```bash
npm run dev
# or
yarn dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

---

## Screenshots

### Home Page (Unauthenticated)

![Home Page (Unauthenticated)](/docs/screenshots/home-unauthenticated.png)

### Home Page (Authenticated)

![Home Page (Authenticated)](/docs/screenshots/home-authenticated.png)

### Video Detail Page

![Video Detail Page](/docs/screenshots/video-details.png)

### Video Upload Page

![Video Upload Page](/docs/screenshots/upload.png)

### Login Page

![Login Page](/docs/screenshots/login.png)

### 404 Page

![404 Page](/docs/screenshots/404.png)

---

## Additonal Information

- **Testing the Application**:

  Ensure that your API endpoints are correctly configured as per the provided environment variables. The application uses simulated authentication and protected routes — log in with your first and last name to access the video dashboard, upload, and editing features.

- **Code Structure**:

  - `src/app/`: Contains Next.js pages using the Next.js App Router.
  - `src/app/actions.ts`: Contains server action for page revalidation.
  - `src/app/api/`: Contains authentication API endpoints for managing authentication cookies.
  - `src/components/`: Contains UI components (e.g., Navbar, VideoCard, CommentSection, CommentForm, etc.).
  - `src/context/`: Contains React Context for authentication and notifications.
  - `src/data/`: Contains video test data.
  - `src/styles`: Contains the MUI theme configuration.
  - `src/utils`: Contains utility functions (e.g., for timestamp formatting and profanity filtering).

- **Limitations**

  - Users are limited to viewing and interacting with only the videos they have uploaded.
  - The API does not support server-side authentication or authorization.
  - DailyMotion videos will not work with `react-player` due to recent updates in their embedding protocols.

- **Future Enhancements**:

  In a production environment, additional authentication endpoints and server-side session management would be implemented to enhance security. The current solution uses client-side authentication simulation and cookies for demonstration purposes.

---

## Conclusion

This project demonstrates a full-stack solution for the Scope Labs Educational Video Player assessment that leverages Next.js's advanced rendering techniques, a modern UI with MUI, and efficient client-side interactivity. Feel free to explore the code, and please refer to the comments and documentation within the codebase for further details on each component.
