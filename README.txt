AppPromo (Frontend + Backend) - pacote gerado automaticamente.

Frontend (Expo):
- Caminho: frontend/
- Como rodar:
  1. Instalar dependências: abra terminal em frontend e rode `npm install`
  2. Rodar: `npm run start`
  3. Configure `frontend/utils/config.js` com o BACKEND_URL para apontar para seu servidor backend.
     Exemplo em uma rede local: 'http://192.168.0.10:3000' ou para emulador Android 'http://10.0.2.2:3000'

Backend (Node.js):
- Caminho: backend/
- Como rodar:
  1. Abra terminal em backend e rode `npm install`
  2. Rode `npm start`
  3. A API ficará disponível em http://localhost:3000 (ou no IP da sua máquina)
  Endpoints úteis:
    GET /promotions
    GET /promotions/:id
    POST /promotions  (body JSON para criar)
    POST /promotions/:id/like
    POST /promotions/:id/save

Observações:
- Lembre-se de ajustar BACKEND_URL no frontend antes de rodar (apontar para o IP do backend).
- Emuladores Android geralmente usam 10.0.2.2 para apontar ao host local.
