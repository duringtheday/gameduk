import React, { useState } from 'react'
import '../styles/CertificateForm.css'
// import seal from '../assets/logo-academia-x.webp'
import badge from '../assets/images-verified-2.png'

export default function CertificateForm() {
  // Estado para el sello de “Aprendizaje Verificado”
  const [sealUrl, setSealUrl] = useState(null)

  const handleSealFile = e => {
    const file = e.target.files[0]
    if (file) setSealUrl(URL.createObjectURL(file))
  }
  const [logoUrl, setLogoUrl] = useState(null)
  const [issuer, setIssuer] = useState('Responsable')
  const [issuerLogoUrl, setIssuerLogoUrl] = useState(null)
  const [userName, setUserName] = useState('')
  const [issueDate, setIssueDate] = useState('') // YYYY-MM-DD

  // Nuevos estados para firma
  const [signatureFileUrl, setSignatureFileUrl] = useState(null)
  const [signatureText, setSignatureText] = useState('Nombre Firmante')

  const handleLogo = e => {
    const file = e.target.files[0]
    if (file) setLogoUrl(URL.createObjectURL(file))
  }

  const handleIssuerLogo = e => {
    const file = e.target.files[0]
    if (file) setIssuerLogoUrl(URL.createObjectURL(file))
  }

  const handleSignatureFile = e => {
    const file = e.target.files[0]
    if (file) setSignatureFileUrl(URL.createObjectURL(file))
  }

  // — FLAGS para “Emitido por” —
  // showIssuerText = true si el usuario ingresó texto en el input "issuer"
  const showIssuerText = issuer.trim() !== ''
  // showIssuerLogo = true si hay una URL de logo cargada
  const showIssuerLogo = Boolean(issuerLogoUrl)

  return (
    <div className="certificate-form-container">
      {/* ─── Formulario ───────────────────────────────────────────────────────── */}
      <aside className="form-section">
        <h2>Construye tu Certificado</h2>

        <div className="form-group">
          <label htmlFor="logo">Tu logo (PNG/JPG):</label>
          <input type="file" id="logo" accept="image/*" onChange={handleLogo} />
        </div>

        <div className="form-group">
          <label htmlFor="issuer">Emitido por (texto):</label>
          <input
            type="text"
            id="issuer"
            value={issuer}
            onChange={e => setIssuer(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="issuerLogo">Logo de la institución:</label>

          <input
            type="file"
            id="issuerLogo"
            accept="image/*"
            onChange={handleIssuerLogo}
          />
        </div>
        {/* Sello de verificación */}
        <div className="form-group">
          <label htmlFor="sealFile">Sello “Aprendizaje Verificado” (PNG/JPG):</label>
          <input
            type="file"
            id="sealFile"
            accept="image/*"
            onChange={handleSealFile}
          />
        </div>

        <div className="form-group">
          <label htmlFor="userName">Tu Nombre Completo:</label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={e => setUserName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="issueDate">Fecha de emisión:</label>
          <input
            type="date"
            id="issueDate"
            value={issueDate}
            onChange={e => setIssueDate(e.target.value)}
          />
        </div>

        {/* Aquí debe haber un lugar para cargar la firma electrónica o poner el nombre sobre el espacio de la firma */}
        <div className="form-group">
          <label htmlFor="signatureFile">Firma electrónica (PNG/JPG):</label>
          <input
            type="file"
            id="signatureFile"
            accept="image/*"
            onChange={handleSignatureFile}
          />
        </div>
        <div className="form-group">
          <label htmlFor="signatureText">O escribe tu firma:</label>
          <input
            type="text"
            id="signatureText"
            value={signatureText}
            onChange={e => setSignatureText(e.target.value)}
          />
        </div>

        <h3>Guía rápida</h3>
        <ul className="guidelines">
          <li>Logo del curso: PNG/JPG, máximo 200×200 px</li>
          <li>Emitido por: nombre de tu organización</li>
          <li>Logo de institución: PNG/JPG, máximo 100×100 px</li>
          <li>Tu Nombre: hasta 50 caracteres</li>
          <li>Fecha de emisión: selecciona la fecha correcta</li>
          <li>Firma electrónica o texto de firma</li>
        </ul>
      </aside>

      {/* ─── Vista Previa del Certificado ──────────────────────────────────────── */}
      <section className="preview-section">
        <div className="certificate">
          {/* cinta y sello */}
          <div className="ribbon" />
          {sealUrl && (
            <img
              src={sealUrl}
              alt="Aprendizaje Verificado"
              className="verified-stamp"
            />
          )}


          {/* logo del curso */}
          {logoUrl && <img src={logoUrl} alt="Logo del curso" className="cert-logo" />}

          {/* encabezados */}
          <h1 className="cert-header" style={{ fontFamily: "'Exo 2', sans serif", letterSpacing: '0.8px', color: '#8c8c8c' }}>Certificado de Finalización</h1>
          <p className="cert-validate">Este certificado valida que</p>
          <h2 className="cert-name">{userName}</h2>
          <p className="cert-complete">ha completado exitosamente el reto</p>
          <h3 className="cert-course">Desafío de Storytelling con Datos</h3>

          {/* fechas, emisor y firma en una sola fila */}
          <div className="cert-details">
            {/* 1) Emitido el */}
            <div className="detail-item">
              <span className="detail-label">Emitido el:</span>
              <span className="detail-value">
                {new Date(issueDate).toLocaleDateString('es-ES', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </span>
            </div>

            {/* 2) Emitido por */}
            <div
              className={
                `detail-item issuer-item` +
                (issuer.trim() ? ' has-text' : '') +
                (issuerLogoUrl ? ' has-logo' : '')
              }
            >
              <span className="detail-label">Emitido por:</span>

              {/* Texto solo si existe */}
              {issuer.trim() && (
                <span className="detail-value issuer-logo">{issuer}</span>
              )}

              {/* Logo solo si existe */}
              {issuerLogoUrl && (
                <img
                  src={issuerLogoUrl}
                  alt="Logo de institución"
                  className="issuer-logo-img"
                />
              )}
            </div>

            {/* 3) Firma */}
            <div className="detail-item">
              {signatureFileUrl ? (
                <img
                  src={signatureFileUrl}
                  alt="Firma electrónica"
                  className="signature-img"
                />
              ) : (
                <span className="signature-name">{signatureText}</span>
              )}
              <span className="signature-role">Cargo Firmante</span>
            </div>
          </div>

          {/* verificación blockchain */}
          <div className="cert-footer">
            <img src={badge} alt="Blockchain Badge" className="badge-icon" />
            <span className="verify-text">
              Verificar en: gameduk.com/verify/ID_UNICO_BLOCKCHAIN
            </span>
          </div>

          {/* botón imprimir */}
          <button onClick={() => window.print()} className="print-btn">
            Imprimir
          </button>
        </div>
      </section>
    </div>
  )
}







