const listings = [
  { title: 'Deniz Manzaralı Lüks Daire', price: 3500000, roomCount: '3+1', squareMeters: 120, imageUrls: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800', mapCoordinates: '41.0082,28.9784', description: 'Harika deniz manzaralı geniş daire.', buildingAge: 5, floor: 4, contactInfo: 'Ahmet Yılmaz - 0555 123 45 67', properties: 'Kombi,Asansör' },
  { title: 'Merkezi Konumda Ofis', price: 1200000, roomCount: '1+0', squareMeters: 65, imageUrls: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800', mapCoordinates: '41.0582,28.9884', description: 'Metrobüse yürüme mesafesinde işlek ofis.', buildingAge: 10, floor: 2, contactInfo: 'Mehmet Öz - 0532 987 65 43', properties: 'Güvenlik,Otopark' },
  { title: 'Bahçeli Müstakil Ev', price: 5500000, roomCount: '4+1', squareMeters: 200, imageUrls: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800', mapCoordinates: '41.1082,29.0784', description: 'Doğa ile iç içe huzurlu müstakil ev.', buildingAge: 2, floor: 1, contactInfo: 'Ayşe Kaya - 0505 111 22 33', properties: 'Havuz,Bahçe,Şömine' },
  { title: 'Metroya Yakın 2+1 Daire', price: 2100000, roomCount: '2+1', squareMeters: 90, imageUrls: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800', mapCoordinates: '41.0282,28.9584', description: 'Yatırımlık veya oturmalık, ulaşıma çok yakın daire.', buildingAge: 15, floor: 3, contactInfo: 'Ali Veli - 0544 333 44 55', properties: 'Kombi,Balkon' },
  { title: 'Site İçerisinde Aile Evi', price: 4200000, roomCount: '3+1', squareMeters: 140, imageUrls: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?w=800', mapCoordinates: '41.0182,29.1784', description: 'Güvenlikli, sosyal alanları olan sitede satılık daire.', buildingAge: 8, floor: 5, contactInfo: 'Zeynep Demir - 0555 666 77 88', properties: 'Güvenlik,Havuz,Spor Salonu' },
  { title: 'Denize Sıfır Yazlık', price: 6800000, roomCount: '4+2', squareMeters: 250, imageUrls: 'https://images.unsplash.com/photo-1494526585095-c41746248156?w=800', mapCoordinates: '40.0082,27.9784', description: 'Tatil yöresinde, özel plajlı lüks yazlık.', buildingAge: 3, floor: 2, contactInfo: 'Ahmet Yılmaz - 0555 123 45 67', properties: 'Özel Plaj,Bahçe,Teras' },
  { title: 'Lüks Rezidans Daire', price: 8500000, roomCount: '2+1', squareMeters: 110, imageUrls: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800', mapCoordinates: '41.0782,29.0184', description: 'Akıllı ev sistemli, full eşyalı lüks rezidans daire.', buildingAge: 0, floor: 15, contactInfo: 'Mehmet Öz - 0532 987 65 43', properties: 'Akıllı Ev,Eşyalı,Güvenlik,Otopark' },
  { title: 'Geniş Teraslı Dubleks', price: 4900000, roomCount: '5+1', squareMeters: 220, imageUrls: 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800', mapCoordinates: '41.0482,28.9984', description: 'Şehir manzaralı harika teraslı dubleks daire.', buildingAge: 12, floor: 6, contactInfo: 'Ayşe Kaya - 0505 111 22 33', properties: 'Teras,Kombi,Asansör' },
];

async function seed() {
  for (const listing of listings) {
    try {
      const res = await fetch('http://localhost:5000/api/listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(listing)
      });
      if (!res.ok) {
        console.error('Failed to add listing', listing.title, await res.text());
      } else {
        console.log('Added:', listing.title);
      }
    } catch (e) {
      console.error('Error adding list', e);
    }
  }
}

seed();
