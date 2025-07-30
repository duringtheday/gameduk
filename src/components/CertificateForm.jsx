import React, { useState, useRef } from 'react'
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
  const [userName, setUserName] = useState('Tu Nombre Aquí')
  const [issueDate, setIssueDate] = useState('') // YYYY-MM-DD

  // Nuevos estados para firma
  const [signatureFileUrl, setSignatureFileUrl] = useState(null)
  const [signatureText, setSignatureText] = useState('Nombre Firmante')

  // — FLAGS para “Emitido por” —
  // showIssuerText = true si el usuario ingresó texto en el input "issuer"
  const showIssuerText = issuer.trim() !== ''
  // showIssuerLogo = true si hay una URL de logo cargada
  const showIssuerLogo = Boolean(issuerLogoUrl)

  // ─── Refs para enfocar campos al editar ────────────────────────────────────
  const logoInputRef = useRef(null)
  const issuerInputRef = useRef(null)
  const issuerLogoInputRef = useRef(null)
  const sealInputRef = useRef(null)
  const userNameRef = useRef(null)
  const issueDateRef = useRef(null)
  const signatureFileRef = useRef(null)
  const signatureTextRef = useRef(null)


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


  // ─── Manejador genérico de archivos ───────────────────────────────────────
  const handleFile = (e, setter) => {
    const file = e.target.files[0]
    if (file) setter(URL.createObjectURL(file))
  }


  // ─── Limpiar campo ─────────────────────────────────────────────────────────
  const clear = setter => () => setter('')

  return (
    <div className="certificate-form-container">
      {/* ─── Formulario ───────────────────────────────────────────────────────── */}
      <aside className="form-section">
        <h2>Construye tu Certificado</h2>

        {/* ─── Logo del curso con drag & drop + preview ───────────────────── */}
        <div
          className="form-group drop-zone"
          onDragOver={e => {
            e.preventDefault()
            e.currentTarget.classList.add('drag-over')
          }}
          onDragLeave={e =>
            e.currentTarget.classList.remove('drag-over')
          }
          onDrop={e => {
            e.preventDefault()
            e.currentTarget.classList.remove('drag-over')
            const file = e.dataTransfer.files[0]
            if (file) {
              const url = URL.createObjectURL(file)
              setLogoUrl(url)
            }
          }}
        >
          <label htmlFor="logo" className="file-label">
            <input
              ref={logoInputRef}
              type="file"
              id="logo"
              accept="image/*"
              onChange={e => {
                const file = e.target.files[0]
                if (file) setLogoUrl(URL.createObjectURL(file))
              }}
              style={{ display: 'none' }}
            />
            Arrastra o haz clic para subir tu logo
          </label>

          {logoUrl && (
            <>
              {/* preview del logo justo aquí */}
              <img
                src={logoUrl}
                alt="Logo cargado"
                className="cert-logo"
              />
              {/* botón para borrar el logo */}
              <button
                type="button"
                className="btn-clear"
                onClick={() => setLogoUrl(null)}
              >
                🗑️ Borrar logo
              </button>
            </>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="issuer">Emitido por (texto):</label>
          <input
            type="text"
            id="issuer"
            className="issuer-input"
            value={issuer}
            onChange={e => setIssuer(e.target.value)}
          />
          <button type="button" className="btn-edit" onClick={() => issuerInputRef.current.focus()}>
            ✏️ Editar
          </button>
          <button type="button" className="btn-clear" onClick={clear(setIssuer)}>
            🗑️ Borrar
          </button>
        </div>

        {/* ─── Logo de la institución con drag & drop + preview ───────────────── */}
        <div
          className="form-group drop-zone"
          onDragOver={e => {
            e.preventDefault()
            e.currentTarget.classList.add('drag-over')
          }}
          onDragLeave={e => {
            e.currentTarget.classList.remove('drag-over')
          }}
          onDrop={e => {
            e.preventDefault()
            e.currentTarget.classList.remove('drag-over')
            const file = e.dataTransfer.files[0]
            if (file) {
              setIssuerLogoUrl(URL.createObjectURL(file))
            }
          }}
        >
          <label htmlFor="issuerLogo" className="file-label">
            {/* input oculto pero clicable */}
            <input
              ref={issuerLogoInputRef}
              type="file"
              id="issuerLogo"
              accept="image/*"
              onChange={e => {
                const file = e.target.files[0]
                if (file) setIssuerLogoUrl(URL.createObjectURL(file))
              }}
              style={{ display: 'none' }}
            />
            Arrastra o haz clic para subir logo de institución
          </label>

          {issuerLogoUrl && (
            <>
              {/* preview del logo */}
              <img
                src={issuerLogoUrl}
                alt="Logo de institución cargado"
                className="issuer-logo-img"
              />
              {/* botón borrar */}
              <button
                type="button"
                className="btn-clear"
                onClick={() => setIssuerLogoUrl(null)}
              >
                🗑️ Borrar logo
              </button>
            </>
          )}
        </div>

        {/* ─── Sello de verificación con drag & drop + preview ───────────────── */}
        <div
          className="form-group drop-zone"
          onDragOver={e => {
            e.preventDefault()
            e.currentTarget.classList.add('drag-over')
          }}
          onDragLeave={e =>
            e.currentTarget.classList.remove('drag-over')
          }
          onDrop={e => {
            e.preventDefault()
            e.currentTarget.classList.remove('drag-over')
            const file = e.dataTransfer.files[0]
            if (file) {
              const url = URL.createObjectURL(file)
              setSealUrl(url)
            }
          }}
        >
          <label htmlFor="sealFile" className="file-label">
            {/* input oculto pero clicable */}
            <input
              ref={sealInputRef}
              type="file"
              id="sealFile"
              accept="image/*"
              onChange={e => {
                const file = e.target.files[0]
                if (file) setSealUrl(URL.createObjectURL(file))
              }}
              style={{ display: 'none' }}
            />
            Arrastra o haz clic para subir tu sello
          </label>

          {sealUrl && (
            <>
              {/* preview del sello justo aquí */}
              <img
                src={sealUrl}
                alt="Sello cargado"
                className="signature-img"
              />
              {/* botón para borrar el sello */}
              <button
                type="button"
                className="btn-clear"
                onClick={() => setSealUrl(null)}
              >
                🗑️ Borrar sello
              </button>
            </>
          )}
        </div>


        <div className="form-group">
          <label htmlFor="userName">Tu Nombre Completo:</label>
          <input
            type="text"
            id="userName"
            className="issuer-input"
            value={userName}
            onChange={e => setUserName(e.target.value)}
          />
          <button type="button" className="btn-edit" onClick={() => userNameRef.current.focus()}>
            ✏️ Editar
          </button>
          <button type="button" className="btn-clear" onClick={clear(setUserName)}>
            🗑️ Borrar
          </button>
        </div>

        <div className="form-group">
          <label htmlFor="issueDate">Fecha de emisión:</label>
          <input
            ref={issueDateRef}
            type="date"
            id="issueDate"
            value={issueDate}
            onChange={e => setIssueDate(e.target.value)}
          />
          <button type="button" className="btn-clear" onClick={clear(setIssueDate)}>
            🗑️ Borrar
          </button>
        </div>

        {/* ─── Firma electrónica con drag & drop + preview ──────────────────────── */}
        <div
          className="form-group drop-zone"
          onDragOver={e => {
            e.preventDefault()
            e.currentTarget.classList.add('drag-over')
          }}
          onDragLeave={e =>
            e.currentTarget.classList.remove('drag-over')
          }
          onDrop={e => {
            e.preventDefault()
            e.currentTarget.classList.remove('drag-over')
            const file = e.dataTransfer.files[0]
            if (file) {
              // crea URL y guarda en estado
              setSignatureFileUrl(URL.createObjectURL(file))
            }
          }}
        >
          <label htmlFor="signatureFile" className="file-label">
            <input
              type="file"
              id="signatureFile"
              accept="image/*"
              onChange={e => handleFile(e, setSignatureFileUrl)}
              style={{ display: 'none' }}
            />
            Arrastra o haz clic para subir tu firma
          </label>
        </div>

        {signatureFileUrl && (
          <>
            {/* muestra mini‑preview de la firma */}
            <img
              src={signatureFileUrl}
              alt="Firma cargada"
              className="signature-img"
            />
            {/* botón borrar firma */}
            <button
              type="button"
              className="btn-clear"
              onClick={() => setSignatureFileUrl(null)}
            >
              🗑️ Borrar
            </button>
          </>
        )}

        <div className="form-group">
          <label htmlFor="signatureText">O escribe tu firma:</label>
          <input
            type="text"
            id="signatureText"
            className="issuer-input"
            value={signatureText}
            onChange={e => setSignatureText(e.target.value)}
          />
          <button type="button" className="btn-edit" onClick={() => signatureTextRef.current.focus()}>
            ✏️ Editar
          </button>
          <button type="button" className="btn-clear" onClick={clear(setSignatureText)}>
            🗑️ Borrar
          </button>
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
      </aside >

      {/* ─── Vista Previa del Certificado ──────────────────────────────────────── */}
      < section className="preview-section" >
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
                (showIssuerText ? ' has-text' : '') +
                (showIssuerLogo ? ' has-logo' : '')
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
      </section >
    </div >
  )
}







