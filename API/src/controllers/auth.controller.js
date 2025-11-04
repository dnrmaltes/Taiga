const store = require("../db/store");

// --- REGISTRO ---
exports.register = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ ok: false, error: "Email y contraseña son obligatorios" });
  }

  // Buscar si ya existe
  const existe = store.usuarios.find(u => u.email === email);
  if (existe) {
    return res.status(400).json({ ok: false, error: "El email ya está registrado" });
  }

  const nuevoUsuario = { id: store.usuarios.length + 1, email, password };
  store.usuarios.push(nuevoUsuario);

  return res.status(201).json({ ok: true, message: "Usuario registrado correctamente", usuario: nuevoUsuario });
};

// --- LOGIN ---
exports.login = (req, res) => {
  const { email, password } = req.body;

  const usuario = store.usuarios.find(u => u.email === email && u.password === password);
  if (!usuario) {
    return res.status(401).json({ ok: false, error: "Credenciales incorrectas" });
  }

  return res.json({ ok: true, message: "Login exitoso", usuario });
};

// --- RECUPERACIÓN ---
exports.recover = (req, res) => {
  const { email } = req.body;

  const usuario = store.usuarios.find(u => u.email === email);
  if (!usuario) {
    return res.status(404).json({ ok: false, error: "Usuario no encontrado" });
  }

  const token = `token-${Date.now()}`;
  store.tokens_recuperacion.push({ email, token });

  return res.json({ ok: true, message: "Token de recuperación generado", token });
};