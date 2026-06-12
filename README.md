# October Chemistry Club — Website

> **Where Science Meets Innovation**  
> Official website for OCC at October STEM School, Egypt.

---

## Project Structure

```
occ-website/
├── index.html                  ← Main entry point
├── README.md
│
├── assets/
│   └── logo.jpg                ← Club logo (add your file here)
│
└── src/
    ├── css/
    │   ├── base.css            ← Reset, CSS variables, utility classes, animations
    │   ├── nav.css             ← Navigation bar & mobile menu
    │   ├── hero.css            ← Hero section & hero card
    │   ├── sections.css        ← About, Tracks, CST, Leadership, Testimonials, Footer
    │   ├── forms.css           ← Apply section, form tabs, inputs, success/error states
    │   └── responsive.css      ← All breakpoints (1024px, 820px, 520px)
    │
    └── js/
        ├── firebase.js         ← Firebase init + Firestore helpers
        ├── ui.js               ← Nav scroll, animations, countdown, tab switching
        └── forms.js            ← Membership & CST form submission logic
```

---

## Firebase Collections

### `membership_applications`
Stores club membership form submissions.

| Field         | Type      | Description                              |
|---------------|-----------|------------------------------------------|
| `name`        | string    | Full name of applicant                   |
| `email`       | string    | Institutional email                      |
| `branch`      | string    | School branch selected                   |
| `track`       | string    | AP Chemistry / Computational / Magazine  |
| `statement`   | string    | Research intent statement                |
| `status`      | string    | `"pending"` (default)                    |
| `submittedAt` | timestamp | Server-side timestamp                    |

### `cst_registrations`
Stores CST 2026 team registration submissions.

| Field         | Type      | Description                              |
|---------------|-----------|------------------------------------------|
| `teamName`    | string    | Team name                                |
| `leader`      | string    | Team leader full name                    |
| `email`       | string    | Team leader email                        |
| `school`      | string    | School / institution                     |
| `size`        | string    | Number of members (2–4)                  |
| `members`     | string    | Other team member names (comma-sep)      |
| `events`      | array     | Selected competition events              |
| `topic`       | string    | Research presentation topic (optional)   |
| `status`      | string    | `"pending"` (default)                    |
| `submittedAt` | timestamp | Server-side timestamp                    |

---

## Setup

### 1. Clone / download the project
```bash
git clone https://github.com/your-org/occ-website.git
cd occ-website
```

### 2. Add your logo
Drop `logo.jpg` into the `assets/` folder.  
If no logo is found, the site auto-falls back to the "Oc" monogram mark.

### 3. Firebase — Firestore rules
In the Firebase console, set Firestore rules to allow form writes:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow anyone to create (submit) an application; read requires auth
    match /membership_applications/{doc} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
    match /cst_registrations/{doc} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
  }
}
```

### 4. Serve locally
Use any static server, e.g.:
```bash
npx serve .
# or
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

---

## Features

- ✅ Responsive design (mobile-first, 3 breakpoints)
- ✅ Firebase Firestore integration (two collections)
- ✅ Duplicate email detection before submission
- ✅ Firebase Analytics event tracking
- ✅ Tabbed forms: Club Membership + CST 2026 Registration
- ✅ Real-time countdown to CST 2026 (July 6)
- ✅ Scroll-triggered reveal animations
- ✅ Animated stat counters
- ✅ Animated publication bar charts
- ✅ Mobile hamburger menu

---

## Deployment

The site is pure HTML/CSS/JS — deploy to any static host:
- **GitHub Pages** — push to `main`, enable Pages
- **Firebase Hosting** — `firebase deploy`
- **Netlify / Vercel** — drag & drop the folder

---

## Admin — Viewing Submissions

Log into [Firebase Console](https://console.firebase.google.com) → **Firestore Database**  
→ `membership_applications` or `cst_registrations`

To export submissions to a spreadsheet:
```bash
npx firestore-export-import export -c membership_applications
```

---

*© 2024 October Chemistry Club. October STEM School, October City, Egypt.*
