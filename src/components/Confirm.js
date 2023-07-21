import React from 'react';
import "./Confirm.css";
import { useLocation, useHistory } from "react-router-dom";
//import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

const Confirm = () => {

    const location = useLocation();
    const formData = location.state;
    const pizzaBilgileri = location.pizza;
    const history = useHistory();

    const calculateSelectedItemsTotal = (formData) => {
        const ekMalzemeFiyati = 5;
        if (formData) {
            const toplam = ekMalzemeFiyati * formData.malzemeler.length;
            return toplam;
        }
        return 0;
    };


    const calculateOrderTotal = (formData) => {
        let result = 0;
        if (formData && pizzaBilgileri) {
            result = pizzaBilgileri.fiyat;
            const toplamFiyat =
                (pizzaBilgileri.fiyat + calculateSelectedItemsTotal(formData)) *
                formData.adet;
            if (formData.boyut === "S") {
                result = toplamFiyat;
            } else if (formData.boyut === "M") {
                result = toplamFiyat + 10;
            } else if (formData.boyut === "L") {
                result = toplamFiyat + 20;
            }
        }
        return result;
    };

    // const handleRedirectHome = () => {
    //     history.push("/")
    // }

    if (!formData || !pizzaBilgileri) {
        history.push("/redirect-order")
    }

    console.log(pizzaBilgileri);
    console.log(formData);

    return (

        <div className='success-page'>

            <div className="ty-logo">
            <img src="/logo.svg" alt="Teknolojik Yemekler logo" />
            </div>
            
            <p id='satisfy' style={{  color: '#FDC913'}}>lezzetin yolda</p>

            <p style={{ fontFamily: "Barlow", width: "40%", textAlign: "center", fontSize: "3rem", marginTop: "0%", borderBottom: "1px solid white", paddingBottom: "2%" }}>SİPARİŞ ALINDI</p>
          
            <h4>{pizzaBilgileri && pizzaBilgileri.isim}</h4>
            
            <div className='pizza'>
        
                <p>Boyut:<span style={{ marginLeft: "2%", fontWeight: "bold" }}>{formData && formData.boyut}</span></p>
                <p>Hamur:<span style={{ marginLeft: "2%", fontWeight: "bold" }}>{formData && formData.hamur}</span> </p>
                <p>Malzemeler:<span style={{ marginLeft: "2%", fontWeight: "bold" }}>{formData && formData.malzemeler.join(', ')}</span> </p>
                <p>Sipariş Notu:<span style={{ marginLeft: "2%", fontWeight: "bold" }}>{formData && formData.siparisNotu}</span></p>
            
            </div>

            <div className="siparis-toplami">
                <h3>Sipariş Toplamı</h3>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", marginLeft: "15%" }}>
                    <p> Seçimler</p>
                    <p>{calculateSelectedItemsTotal(formData)} ₺</p>
                </div>
               
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", marginLeft: "15%" }}>
                   
                    <p> Toplam </p>
                    <p>{calculateOrderTotal(formData)}₺</p>

                </div>
            </div>
         
        </div>

    );
};

export default Confirm;