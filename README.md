# 🏡 Emlak Yönetim Sistemi

Bu proje, modern bir gayrimenkul / emlak yönetim platformudur. Kullanıcılar satılık/kiralık ev, arsa ve ofis ilanlarını görüntüleyebilir, ilanların detaylarını (oda sayısı, metrekare, kat vb.) inceleyebilir ve konumlara harita üzerinden bakabilir.

## 🚀 Kullanılan Teknolojiler

- **Frontend:** React, TypeScript, Vite, Tailwind CSS, React Router, Axios
- **Backend:** .NET Core Web API (C#)
- **Mimari:** RESTful API ve Modern Component Tabanlı UI

## 📋 Gereksinimler

Projenin bilgisayarınızda çalışabilmesi için aşağıdakilerin kurulu olması gerekir:
- [Node.js](https://nodejs.org/tr/) (v16 veya üzeri - Frontend için)
- [.NET 8.0 SDK](https://dotnet.microsoft.com/download) (veya kullanımdaki .NET sürümü - Backend için)

## 🛠️ Kurulum ve Çalıştırma Adımları

Projeyi yerel ortamınızda ayağa kaldırmak için aşağıdaki adımları sırasıyla izleyin:

### 1. Projeyi Klonlayın
```bash
git clone https://github.com/barisbayrakk/RealEstateManagementSystem.git
cd RealEstateManagementSystem
```

### 2. Backend'i (Sunucu) Çalıştırma
Terminalde Backend klasörüne girin, bağımlılıkları yükleyin ve projeyi başlatın:
```bash
cd Backend
dotnet restore
dotnet run --urls="http://localhost:5000"
```
*Not: Backend sunucusu `http://localhost:5000` adresinde çalışmaya başlayacaktır. Bu terminali açık bırakın.*

### 3. Frontend'i (İstemci) Çalıştırma
Yeni bir terminal sekmesi (veya penceresi) açın, Frontend klasörüne girin ve React uygulamasını başlatın:
```bash
cd Frontend
npm install
npm run dev
```
*İşlem tamamlandığında terminalin size vereceği adresten (genellikle `http://localhost:3000`) projeyi tarayıcınızda açıp inceleyebilirsiniz.*

## 📂 Proje Yapısı Hakkında
Proje temelde ikiye ayrılmıştır:
- `Backend/`: API uç noktalarının, modellerin ve sunucu tarafı mantığının bulunduğu C# API projesi.
- `Frontend/`: Kullanıcı arayüzünün, sayfaların (Home, About, ListingDetail vb.) ve bileşenlerin bulunduğu Vite/React projesi.
