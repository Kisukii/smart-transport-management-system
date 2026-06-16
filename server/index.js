const express = require("express");
const cors = require("cors");
const path = require("path");
const driverRoutes = require("./routes/driverRoutes");

const app = express();

app.use(cors({
  origin: "*"
}));
app.use(express.json());
app.use("/drivers", driverRoutes);

/* LOGIN */
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (
    email === "admin@leadforge.com" &&
    password === "123456"
  ) {
    return res.json({
      success: true,
      user: {
        name: "Nandana",
        role: "Admin",
      },
    });
  }

  return res.status(401).json({
    success: false,
    message: "Invalid credentials",
  });
});

/* LEADS */
app.get("/leads", (req, res) => {
  res.json([
    {
      id: 1,
      company: "Tesla",
      status: "New",
      email: "tesla@email.com",
    },
    {
      id: 2,
      company: "Amazon",
      status: "Contacted",
      email: "amazon@email.com",
    },
    {
      id: 3,
      company: "Netflix",
      status: "Proposal",
      email: "netflix@email.com",
    },
  ]);
});

/* NEWORDER */
app.get("/neworder", (req, res) => {
  res.json({
    New: ["Tesla", "Spotify"],
    Contacted: ["Amazon"],
    Proposal: ["Netflix"],
    Closed: ["Adobe"],
  });
});


app.get("/tracking", (req, res) => {
  res.json({
    revenue: "₹4.2L",
    conversionRate: "32%",
    activeClients: 48,
    totalLeads: 128,
  });
});

const PORT = process.env.PORT || 5000;
// Serve static client build if present (for production deployments)
const clientBuildPath = path.join(__dirname, '..', 'client', 'dist');
if (require('fs').existsSync(clientBuildPath)) {
  app.use(express.static(clientBuildPath));
  // Fallback to index.html for any GET request that likely targets the SPA
  app.use((req, res, next) => {
    if (req.method !== 'GET') return next();

    // Don't interfere with API routes
    const apiPrefixes = ['/login', '/leads', '/neworder', '/tracking'];
    if (apiPrefixes.some(p => req.path.startsWith(p))) return next();

    // If request has a file extension, let static middleware handle it (404 if not found)
    if (path.extname(req.path)) return next();

    // Otherwise serve SPA index
    return res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});