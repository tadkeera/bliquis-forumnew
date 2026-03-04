import logo from "@/assets/logo.png";

const FormHeader = () => {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      border: "2px solid #c0c8d4",
      borderRadius: "12px",
      padding: "8px 20px",
      marginBottom: "10px",
      height: "2cm",
      maxHeight: "2cm",
      overflow: "hidden",
      width: "100%",
      boxSizing: "border-box",
      backgroundColor: "#f0f2f5",
    }}>
      {/* Left side - English */}
      <div style={{ textAlign: "left", direction: "ltr", width: "35%", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <strong style={{ fontSize: "17px", color: "#1a3a6b", fontWeight: "900", letterSpacing: "0.5px" }}>Bilquis Drug Stores</strong>
        <div style={{ width: "85%", height: "2.5px", backgroundColor: "#1a2a4a", margin: "4px 0" }}></div>
      </div>

      {/* Center - Logo + URL */}
      <div style={{ textAlign: "center", width: "25%", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <img src={logo} alt="Logo" style={{ maxHeight: "38px", objectFit: "contain" }} />
        <span style={{ fontSize: "10px", color: "#333", fontWeight: "bold", marginTop: "2px" }}>www.bilquis-yo.com</span>
      </div>

      {/* Right side - Arabic */}
      <div style={{ textAlign: "right", width: "35%", display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
        <strong style={{ fontSize: "18px", color: "#1a3a6b", fontWeight: "900" }}>مخازن بلقيس للأدوية</strong>
        <div style={{ width: "85%", height: "2.5px", backgroundColor: "#c81e1e", margin: "4px 0" }}></div>
      </div>
    </div>
  );
};

export default FormHeader;
