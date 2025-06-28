document.getElementById("appForm")?.addEventListener("submit", function(e) {
  e.preventDefault();
  window.location.href = "result.html?name=" + encodeURIComponent(document.getElementById("appName").value) +
    "&desc=" + encodeURIComponent(document.getElementById("appDesc").value) +
    "&pages=" + encodeURIComponent(document.getElementById("appPages").value);
});

document.getElementById("downloadBtn")?.addEventListener("click", async function() {
  const params = new URLSearchParams(window.location.search);
  const name = params.get("name") || "MeuApp";
  const desc = params.get("desc") || "";
  const pages = (params.get("pages") || "").split(",");

  const zip = new JSZip();
  // HTML simples de exemplo para cada página
  pages.forEach(page => {
    const fileName = page.trim().toLowerCase().replace(/\s+/g, "_") + ".html";
    zip.file(fileName, `
<!DOCTYPE html>
<html>
<head><title>${page.trim()}</title></head>
<body><h1>${page.trim()}</h1><p>Gerado por YAMOZENG: ${desc}</p></body>
</html>
    `);
  });
  // Adiciona style.css
  zip.file("style.css", document.querySelector("link[rel='stylesheet']").href);
  // Gerar o ZIP
  const content = await zip.generateAsync({ type: "blob" });
  saveAs(content, name + ".zip");
});