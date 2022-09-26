import React from 'react';
import { Drawer, Row, Col } from 'antd';
import Text from '../../../../components/Text';
import { DrawerBody } from '../../styles';

function DocDrawer({ isPopup, setIsPopup }) {
    return (
        <>
            <Drawer
                title="Kullanıcı Sözleşmesi"
                placement="right"
                className="signup-popup"
                width="480px"
                onClose={() => setIsPopup(false)}
                visible={isPopup}>
                <DrawerBody>
                    <Text className="sub-value">
                        İşbu Üyelik Sözleşmesi; bir tarafta Fon Radar Bilişim Teknolojileri Sanayi ve Ticaret
                        Anonim Şirketi (ŞİRKET) ile diğer tarafta KULLANICI TİCARİ İŞLETME arasında aşağıda
                        yazılı şartlar dâhilinde akdedilmiştir.
                    </Text>
                    <p className="drawer-title">1. TARAF BİLGİLERİ </p>
                    <Row>
                        <Col className="mb-8">
                            <Text className="sub-title">Ünvan:</Text>
                            <Text className="sub-value">
                                Fon Radar Bilişim Teknolojileri Sanayi ve Ticaret Anonim Şirketi
                            </Text>
                        </Col>
                        <Col className="mb-8">
                            <Text className="sub-title">Adres:</Text>
                            <Text className="sub-value">
                                Büyükdere Caddesi No:255 Nurol Plaza B 02 Sarıyer/İstanbul
                            </Text>
                        </Col>
                        <Col className="mb-8">
                            <Text className="sub-title">Telefon:</Text>
                            <Text className="sub-value">(532) 236 64 30</Text>
                        </Col>
                        <Col className="mb-8">
                            <Text className="sub-title">Vergi No:</Text>
                            <Text className="sub-value">Büyükdere 3881591970</Text>
                        </Col>
                        <Col className="mb-8">
                            <Text className="sub-title">E-posta:</Text>
                            <Text className="sub-value">fonradar@hs06.kep.tr</Text>
                        </Col>
                        <Col className="mb-8">
                            <Text className="sub-title">İnternet Adresi:</Text>
                            <Text className="sub-value">www.fonradar.com</Text>
                        </Col>
                        <Col className="mb-8">
                            <Text className="sub-title">MERSİS No:</Text>
                            <Text className="sub-value">0388159197000001</Text>
                        </Col>
                        <Col className="mb-8">
                            <Text className="sub-title">Ticaret Sicil No:</Text>
                            <Text className="sub-value">205399-5</Text>
                        </Col>
                    </Row>
                    <Row>
                        <p className="drawer-title">SÖZLEŞMENİN KONUSU</p>
                        <Text className="sub-value">
                            İşbu kullanıcı sözleşmesi, her türlü fikri mülkiyet hakları ŞİRKET’e ait bulunan
                            FON RADAR platformunun (FON RADAR) kullanım şartlarını düzenlemektedir.
                        </Text>
                    </Row>
                    <Row style={{ rowGap: 12 }}>
                        <p className="drawer-title1">SÖZLEŞMENİN HÜKÜMLERİ</p>
                        <Text className="sub-value">
                            3.1. FON RADAR, kullanıcı KOBİ İşletmelerin faturalı alacaklarına ve bu alacağa
                            konu olan fatura/lar ve vadeli çek/lerini finansman bulmak amacıyla FON RADAR ’a
                            yüklemelerine, Üye Finans Kurumlarının da söz konusu fatura/lar ve vadeli
                            çek/lerini FON RADAR ’dan belirleyerek temlik karşılığı finanse etme iradelerini,
                            teklif vermek suretiyle ortaya koymalarına imkân tanımaktadır. Fon Radar direkt
                            veya dolaylı yoldan bir finans kurumu, aracı veya acente değildir. Fon Radar
                            faturalı satışlardan doğmuş vadeli alacaklarını nakde çevirmek isteyen KOBİ’ler
                            ile, BDDK lisanslı finans kurumlarını aynı portalde buluşturan bir platformdur.
                        </Text>
                        <Text className="sub-value">
                            3.2. Kullanıcı KOBİ’ler, FON RADAR ‘ı, kendilerine ait oluşturulacak hesaba (“Üye
                            Girişi”) giriş yaparak kullanacaklardır. Üye Girişi, Kullanıcı KOBİ’leri, FON
                            RADAR ‘ı kullanma ve tekliflerini oluşturdukları kullanıcı profili üzerinden kabul
                            ettikleri Kullanıcı Üye Finans Kurumları ile FON RADAR üzerinden iletişime geçme
                            hakkı vermektedir. Tanınan bu hak, Kullanıcı Üye Finans Kurumları’nca muhakkak
                            suretle bir finansman sağlanmasına ve/veya sağlanacak finansmanın piyasa
                            koşullarının görece altındaki fiyatlamalarla fon sağlanmasına KESİN TAAHÜT
                            oluşturmaz.
                        </Text>
                        <Text className="sub-value">
                            3.3. Kullanıcı KOBİ’ler, şirket unvanları, vergi numaraları, adres bilgileri, Üye
                            Hesabı için kullanacakları e-posta adreslerini ve şifre bilgilerini girerek üye
                            hesabı açma işlemini tamamlayacaklardır. Bu kapsamda;
                        </Text>
                        <Text className="sub-value">
                            3.3.1. Kullanıcı KOBİ’ler tarafından verilen e-posta adresi ve şifreye münhasır
                            tutularak kullanıcı KOBİ’lere aittir.
                        </Text>
                        <Text className="sub-value">
                            3.3.2. Kullanıcı KOBİ, kullanıcı şifresini, FON RADAR ‘a giriş yapmasını sağlayan
                            diğer bilgileri başkalarıyla paylaşamaz. Kullanıcı KOBİ’ler, bu
                        </Text>
                    </Row>
                </DrawerBody>
            </Drawer>
        </>
    );
}

export default DocDrawer;
