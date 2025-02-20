# FLASH-HACK25
FLASH HACK25 is flash or 3 hour quick hackathon where the immediate solution for the problem statement which given just before the start of hackathon 
# Centralized Digital Notice Board

## Problem Statement

In many colleges, important announcements—such as exam schedules, club events, placement opportunities, and urgent notices—get lost in the noise of multiple communication channels (e.g., WhatsApp groups, emails, and physical notice boards). This fragmentation leads to missed deadlines, low event participation, and overall miscommunication among students and faculty.

## Project Overview

The **Centralized Digital Notice Board** is a digital platform designed to streamline communication by centralizing all important notices in one place. Key features include:

- **Role-Based Access:** Only authorized users (e.g., faculty, club leaders, and admins) can post announcements.
- **Automated Categorization:** An integrated ML model automatically categorizes announcements based on content.
- **Real-Time Updates:** Socket.IO provides live updates to all users when new announcements are posted.
- **User-Friendly Interface:** Separate views for administrators (with a secure login and admin panel) and for students (with subscription filtering).

## Technologies Used

- **Frontend:**
  - **React.js:** For building the user interface.
  - **React Router (v6):** For handling client-side routing.
  - **CSS / Tailwind CSS:** For styling the application.
  - **Socket.IO Client:** For real-time updates.
  
- **Backend:**
  - **Node.js & Express:** For creating RESTful APIs.
  - **Socket.IO:** For real-time bidirectional communication.
  - **TensorFlow.js (with Node binding - @tensorflow/tfjs-node):** For ML-based announcement categorization.
  - **Nodemon:** For hot reloading during development.

## Installation & Running Instructions

### Prerequisites

- Node.js (v18 LTS recommended)
- npm (installed with Node.js)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend

  # Required Dependencies
# Backend
- express
- cors
- socket.io
- @tensorflow/tfjs-node
- nodemon (dev dependency)
# Frontend
- react
- react-dom
- react-router-dom (v6)
- socket.io-client
Other libraries used for UI components (custom or third-party)

# Project Workflow
# Admin Login & Panel:

# Admins log in using default credentials (admin/admin).
They can select their authority type (e.g., HOD, Principal, Director, etc.), which automatically sets the announcement priority.
Once logged in, admins can post announcements via a dedicated admin panel.
User View:

# Students and other users can view announcements on a centralized notice board.
They can filter the notices based on categories or subscriptions.
High-priority announcements (e.g., those posted by HODs or Principals) are pinned and highlighted.
