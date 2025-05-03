let currentUser = null;

async function checkId() {
  const inputAid = document.getElementById('id').value.trim();
  if (!inputAid) {
    alert("กรุณากรอกเลขประจำตัว (aid)");
    return;
  }

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbzIH0e9L9trXFdeNAKefHuO4-yTG-jNbHFf_x0TVLFFNwQETMbqA5viMJt__fIFxXL92g/exec");
    const data = await response.json();

    const user = data.find(item => String(item?.aid) === inputAid);

    if (!user) {
      alert("ไม่พบผู้ใช้ในระบบ");
      return;
    }

    currentUser = user;
    localStorage.setItem("aid", inputAid);

    if (!user.password || user.password.trim() === "") {
      // ไม่มีรหัสผ่าน → ไปกรอกข้อมูลใหม่
      window.location.href = "form.html";
    } else {
      // มีรหัสผ่าน → แสดงช่องรหัสผ่านและปุ่ม login, ซ่อนปุ่มตรวจสอบ
      document.getElementById("passwordDiv").style.display = "contents";
      document.getElementById("loginBtn").style.display = "inline-block";
      document.getElementById("checkBtn").style.display = "none"; // ซ่อนปุ่มตรวจสอบ
    }
  } catch (err) {
    console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", err);
    alert("ไม่สามารถโหลดข้อมูลผู้ใช้ได้");
  }
}

function login() {
  const inputPassword = document.getElementById('password').value;
  if (inputPassword === currentUser.password) {
    localStorage.setItem("userData", JSON.stringify(currentUser));
    window.location.href = "profile.html";
  } else {
    alert("รหัสผ่านไม่ถูกต้อง");
  }
}
