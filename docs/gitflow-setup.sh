#!/bin/bash
# ==============================================
# Script de configuração do GitFlow no GitHub
# Execute APÓS criar o repositório no GitHub
# ==============================================

# 1. Inicializa o repositório local
git init
git add .
git commit -m "chore: setup inicial do projeto"

# 2. Conecta ao repositório remoto (substitua pela sua URL)
# git remote add origin https://github.com/SEU-USUARIO/api-catalogo-produtos.git

# 3. Envia a branch main
git branch -M main
# git push -u origin main

# 4. Cria e envia a branch develop
git checkout -b develop
# git push -u origin develop

# ─── Feature: Setup Inicial ─────────────────────
git checkout -b feature/setup-inicial
# (já feito no commit inicial)
git checkout develop
git merge feature/setup-inicial --no-ff -m "feat: merge feature/setup-inicial"
git branch -d feature/setup-inicial

# ─── Feature: User Auth ─────────────────────────
git checkout -b feature/user-auth
git add src/models/User.js src/controllers/authController.js src/routes/authRoutes.js src/middlewares/auth.js
git commit -m "feat: adiciona model e schema de usuário com bcrypt"
git add .
git commit -m "feat: implementa rotas de registro e login com JWT"
git checkout develop
git merge feature/user-auth --no-ff -m "feat: merge feature/user-auth"
git branch -d feature/user-auth

# ─── Feature: Product CRUD ──────────────────────
git checkout -b feature/product-crud
git add src/models/Product.js
git commit -m "feat: cria schema de produto com atributos dinâmicos (Map)"
git add src/controllers/productController.js src/routes/productRoutes.js
git commit -m "feat: implementa CRUD completo de produtos com paginação e filtros"
git checkout develop
git merge feature/product-crud --no-ff -m "feat: merge feature/product-crud"
git branch -d feature/product-crud

# ─── Feature: Security ──────────────────────────
git checkout -b feature/security-middlewares
git add src/middlewares/errorHandler.js src/app.js
git commit -m "feat: adiciona helmet, rate-limit e sanitização contra NoSQL injection"
git checkout develop
git merge feature/security-middlewares --no-ff -m "feat: merge feature/security-middlewares"
git branch -d feature/security-middlewares

# ─── Docs ────────────────────────────────────────
git add README.md .env.example .gitignore
git commit -m "docs: adiciona README completo com endpoints e instruções de uso"

# ─── Merge final em main ─────────────────────────
git checkout main
git merge develop --no-ff -m "release: v1.0.0 - API Catálogo de Produtos"

# git push origin main
# git push origin develop

echo ""
echo "✅ GitFlow configurado com sucesso!"
echo "📌 Lembre de substituir a URL do repositório remoto e remover os comentários dos comandos git push/remote."
