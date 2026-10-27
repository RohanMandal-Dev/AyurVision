# 🌿 AyurVision — AI-Powered Ayurvedic Plant & Herb Identifier

AyurVision is a web-based application designed to identify plants and herbs using images and provide information about their Ayurvedic uses, benefits, and potential side effects. It combines a React frontend, PHP backend, and MySQL database to provide a user-friendly plant identification experience.

## ✨ Features

- 🌱 **Plant Identification:** Upload a plant image to identify the plant using an integrated plant identification API.
- 📚 **Plant Information:** View plant names, scientific names, Ayurvedic names, descriptions, traditional uses, benefits, and potential side effects.
- 🔐 **User Authentication:** Register and log in to access user-specific features.
- ❤️ **Personal Library:** Save identified plants to a personal library.
- 🛠️ **Admin Dashboard:** Manage plant records and user information.
- 💬 **Contact & Support:** Submit messages through the contact form.
- 🗄️ **Database Integration:** Store plant information and application data using MySQL.

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| Frontend | React.js, JavaScript, HTML5, CSS3 |
| Backend | PHP |
| Database | MySQL |
| Local Development | XAMPP |
| Plant Identification | Plant.id API, with PlantNet and Trefle integrations explored |

## 📂 Project Structure

```text
AyurVision/
├── frontend/
│   ├── public/
│   └── src/
├── backend/
│   ├── api/
│   ├── config/
│   └── uploads/
├── database/
│   └── ayurvision_database_sanitized.sql
└── README.md
```

## ⚙️ Local Installation and Setup

### Prerequisites

Install the following tools before starting:

- Node.js and npm
- PHP
- MySQL
- XAMPP
- A modern web browser

### 1. Clone the Repository

```bash
git clone https://github.com/Wildbuddy/AyurVision.git
cd AyurVision
```

### 2. Set Up the Database

1. Open the XAMPP Control Panel.
2. Start Apache and MySQL.
3. Open phpMyAdmin.
4. Create a database named `ayurvision_db`.
5. Import `database/ayurvision_database_sanitized.sql`.

The SQL file contains the sanitized project database export. User-specific records and contact messages are not included.

### 3. Configure the PHP Backend

1. Copy the `backend` folder into your XAMPP `htdocs` directory.
2. Ensure the backend is accessible at:

   `http://localhost/ayurvision-backend/api`

3. Update the database connection settings in `backend/config/db.php` if your local MySQL configuration differs.

### 4. Configure API Credentials

Plant identification integrations may require API credentials.

Configure the required credentials securely using environment variables or a private local configuration file. Never commit real API keys, passwords, or other secrets to GitHub.

For the local PHP setup, ensure the backend loads the credentials required by its identification endpoints.

### 5. Configure and Run the Frontend

Open a terminal in the frontend directory:

```bash
cd frontend
npm install
```

Create a local development environment file named `.env.development.local` containing:

```dotenv
VITE_API_BASE_URL=http://localhost/ayurvision-backend/api
```

Start the React development server:

```bash
npm run dev
```

Open the local URL displayed in your terminal.

## 🔒 Security Notes

- API credentials and private configuration files should not be committed to the repository.
- Database exports should not contain real user passwords, personal records, or private messages.
- Configure production credentials separately from local development settings.
- Use HTTPS and appropriate authentication and authorization controls when deploying the application.

## ⚠️ Disclaimer

AyurVision is an educational software project intended to explore plant identification and provide information about Ayurvedic plants.

Plant identification results may be inaccurate. Information about traditional uses and potential benefits is provided for educational purposes only and should not be treated as medical advice. Consult a qualified healthcare professional before using herbs for medical purposes.

## 🚧 Future Improvements

- Improve plant identification accuracy.
- Expand the Ayurvedic plant database.
- Improve mobile responsiveness and user experience.
- Deploy the frontend, backend, and database for public access.
- Add more robust validation and security controls.

## 👨‍💻 Author

**AyurVision** — A BCA project exploring web development, database integration, and AI-powered plant identification.

---

⭐ If you find this project interesting, consider starring the repository!