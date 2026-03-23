import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Admin() {
  const navigate = useNavigate();
  const [listings, setListings] = useState<any[]>([]);
  const [form, setForm] = useState<any>({
    id: 0, title: '', description: '', price: '', squareMeters: '', 
    category: 'Ev', 
    roomCount: '', buildingAge: '', floor: '', 
    listingStatus: '', landType: '', unitPrice: '', deedStatus: '', 
    municipality: '', trade: '', authorizedOffice: '',
    imageUrls: '', mapCoordinates: '', location: '', 
    contactInfo: 'Asım İlhan Bayrak - 0538 770 72 11', properties: ''
  });

  const loadListings = () => {
    axios.get('http://localhost:5000/api/listings').then(res => setListings(res.data)).catch(console.error);
  };

  useEffect(() => {
    loadListings();
  }, []);

  const handleChange = (e: any) => {
    let value = e.target.value;
    if (e.target.type === 'number') value = Number(value);
    setForm({ ...form, [e.target.name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    
    // Sanitize numeric fields: Remove dots (thousands), replace comma with dot (decimal)
    const sanitizeDecimal = (val: any) => {
      if (!val) return 0;
      const clean = String(val).replace(/\./g, '').replace(',', '.');
      return parseFloat(clean) || 0;
    };
    const sanitizeInt = (val: any) => {
      if (!val) return 0;
      const clean = String(val).replace(/\./g, '').replace(',', '');
      return parseInt(clean) || 0;
    };

    const submissionData = {
      ...form,
      price: sanitizeDecimal(form.price),
      squareMeters: sanitizeInt(form.squareMeters),
      unitPrice: sanitizeDecimal(form.unitPrice),
      buildingAge: sanitizeInt(form.buildingAge),
      floor: sanitizeInt(form.floor)
    };

    if (form.id === 0) {
      const { id, ...newListing } = submissionData;
      axios.post('http://localhost:5000/api/listings', newListing)
        .then(() => { 
          resetForm();
          loadListings();
          alert('İlan başarıyla eklendi!');
        })
        .catch(err => {
          console.error(err);
          alert('İlan eklenirken bir hata oluştu. Lütfen bilgileri kontrol edin.');
        });
    } else {
      axios.put(`http://localhost:5000/api/listings/${form.id}`, submissionData)
        .then(() => { 
          resetForm();
          loadListings();
          alert('İlan başarıyla güncellendi!');
        })
        .catch(err => {
          console.error(err);
          alert('Güncelleme sırasında bir hata oluştu.');
        });
    }
  };

  const editListing = (l: any) => setForm(l);

  const deleteListing = (id: number) => {
    if (window.confirm("Bu ilanı silmek istediğinize emin misiniz?")) {
      axios.delete(`http://localhost:5000/api/listings/${id}`)
        .then(() => loadListings())
        .catch(console.error);
    }
  };

  const resetForm = () => {
    setForm({
      id: 0, title: '', description: '', price: '', squareMeters: '', 
      category: 'Ev',
      roomCount: '', buildingAge: '', floor: '', 
      listingStatus: '', landType: '', unitPrice: '', deedStatus: '', 
      municipality: '', trade: '', authorizedOffice: '',
      imageUrls: '', mapCoordinates: '', location: '', 
      contactInfo: 'Asım İlhan Bayrak - 0538 770 72 11', properties: ''
    });
  };

  return (
    <div className="bg-[#eef2f7] min-h-screen">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Yönetim Paneli</h1>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-10">
        <h2 className="text-xl font-bold mb-6 text-gray-800">{form.id ? 'İlan Düzenle' : 'Yeni İlan Ekle'}</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-2 text-blue-800">İlan Tipi</label>
            <div className="grid grid-cols-3 gap-2">
          <button type="button" onClick={() => setForm({...form, category: 'Ev'})} className={`py-3 px-4 rounded-xl border-2 font-bold transition-all ${form.category === 'Ev' ? 'border-blue-600 bg-blue-50 text-blue-600 shadow-sm' : 'border-gray-100 text-gray-400 hover:border-gray-200'}`}>
            Ev
          </button>
          <button type="button" onClick={() => setForm({...form, category: 'Arsa'})} className={`py-3 px-4 rounded-xl border-2 font-bold transition-all ${form.category === 'Arsa' ? 'border-green-600 bg-green-50 text-green-600 shadow-sm' : 'border-gray-100 text-gray-400 hover:border-gray-200'}`}>
            Arsa
          </button>
          <button type="button" onClick={() => setForm({...form, category: 'Büro'})} className={`py-3 px-4 rounded-xl border-2 font-bold transition-all ${form.category === 'Büro' ? 'border-yellow-500 bg-yellow-50 text-yellow-600 shadow-sm' : 'border-gray-100 text-gray-400 hover:border-gray-200'}`}>
            Büro
          </button>
        </div>
            </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Başlık</label>
            <input required type="text" name="title" value={form.title} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Açıklama</label>
            <textarea required name="description" value={form.description} onChange={handleChange} className="w-full p-2 border rounded" rows={3} />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Konum (İlçe / Mahalle)</label>
            <input required type="text" name="location" value={form.location} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Örn: Gönen / Kurtuluş Mahallesi" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Fiyat (₺)</label>
            <input required type="text" name="price" value={form.price} 
              onChange={(e) => {
                const val = e.target.value.replace(/[^0-9.,]/g, '');
                handleChange({ target: { name: 'price', value: val, type: 'text' }});
              }} 
              className="w-full p-2 border rounded" 
              placeholder="Örn: 4.500.000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Metrekare (m²)</label>
            <input required type="text" name="squareMeters" value={form.squareMeters} 
              onChange={(e) => {
                const val = e.target.value.replace(/[^0-9.,]/g, '');
                handleChange({ target: { name: 'squareMeters', value: val, type: 'text' }});
              }} 
              className="w-full p-2 border rounded" 
              placeholder="Örn: 120,5"
            />
          </div>

          {(form.category === 'Ev' || form.category === 'Büro') && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">Oda Sayısı</label>
                <input required type="text" name="roomCount" value={form.roomCount} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Örn: 3+1" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Bina Yaşı</label>
                <input required type="text" name="buildingAge" value={form.buildingAge} 
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, '');
                    handleChange({ target: { name: 'buildingAge', value: val, type: 'text' }});
                  }} 
                  className="w-full p-2 border rounded" 
                  placeholder="Örn: 5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Bulunduğu Kat</label>
                <input required type="text" name="floor" value={form.floor} 
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, '');
                    handleChange({ target: { name: 'floor', value: val, type: 'text' }});
                  }} 
                  className="w-full p-2 border rounded" 
                  placeholder="Örn: 2"
                />
              </div>
            </>
          )}
          {form.category === 'Arsa' && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">İlan Durumu</label>
                <input required type="text" name="listingStatus" value={form.listingStatus} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Örn: Satılık" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Arsa Tipi</label>
                <input required type="text" name="landType" value={form.landType} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Örn: İmarlı Arsa" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">m² Birim Fiyatı</label>
                <input required type="text" name="unitPrice" value={form.unitPrice} 
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9.,]/g, '');
                    handleChange({ target: { name: 'unitPrice', value: val, type: 'text' }});
                  }} 
                  className="w-full p-2 border rounded" 
                  placeholder="Örn: 15.000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tapu Durumu</label>
                <input required type="text" name="deedStatus" value={form.deedStatus} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Örn: Müstakil Parsel" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">İlgili Belediye</label>
                <input required type="text" name="municipality" value={form.municipality} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Örn: Gönen Belediyesi" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Takas</label>
                <input required type="text" name="trade" value={form.trade} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Örn: Evet" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Yetkili Ofis</label>
                <input required type="text" name="authorizedOffice" value={form.authorizedOffice} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Örn: Bayrak Emlak" />
              </div>
            </>
          )}

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Resim URL'leri (Virgülle ayırın)</label>
            <input type="text" name="imageUrls" value={form.imageUrls} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Harita Koordinatları (Enlem,Boylam)</label>
            <input type="text" name="mapCoordinates" value={form.mapCoordinates} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Özellikler (Virgülle ayırın, örn: Asansör,Kombi)</label>
            <input type="text" name="properties" value={form.properties} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div className="md:col-span-2 flex space-x-4 mt-4">
            <button type="submit" className={`px-6 py-2 rounded font-bold text-white transition-all ${form.id ? 'bg-orange-600 hover:bg-orange-700' : 'bg-blue-600 hover:bg-blue-700'}`}>
              {form.id ? 'Güncelle' : 'Kaydet'}
            </button>
            {form.id !== 0 && (
              <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-6 py-2 rounded font-bold hover:bg-gray-600">
                İptal
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold mb-4">Mevcut İlanlar</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-3 border">ID</th>
                <th className="p-3 border">Başlık</th>
                <th className="p-3 border">Fiyat</th>
                <th className="p-3 border">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {listings
                .filter((l: any) => (l.category || 'Ev') === form.category)
                .map((l: any) => (
                <tr key={l.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 border">{l.id}</td>
                  <td className="p-3 border font-medium">
                    <span className={`inline-block w-2 h-2 rounded-full mr-2 ${l.category === 'Arsa' ? 'bg-green-500' : l.category === 'Büro' ? 'bg-yellow-500' : 'bg-blue-500'}`}></span>
                    {l.title}
                  </td>
                  <td className="p-3 border">
                    <span className="text-xs font-bold text-gray-400 block uppercase tracking-tighter mb-0.5">{l.category || 'Ev'}</span>
                    ₺{l.price.toLocaleString('tr-TR')}
                  </td>
                  <td className="p-3 border">
                    <button onClick={() => editListing(l)} className="text-blue-600 hover:text-blue-800 mr-4 font-semibold">Düzenle</button>
                    <button onClick={() => deleteListing(l.id)} className="text-red-600 hover:text-red-800 font-semibold">Sil</button>
                  </td>
                </tr>
              ))}
              {listings.filter((l: any) => (l.category || 'Ev') === form.category).length === 0 && (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-500">Bu kategoride henüz ilan bulunmamaktadır.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  );
}
