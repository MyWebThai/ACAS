let currentUser = null;

async function checkId() {
  const inputId = document.getElementById('id').value.trim();
  if (!inputId) {
    alert("กรุณากรอกเลขประจำตัว (id)");
    return;
  }

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbzIH0e9L9trXFdeNAKefHuO4-yTG-jNbHFf_x0TVLFFNwQETMbqA5viMJt__fIFxXL92g/exec");
    const data = await response.json();

    const user = data.find(item => item.id.toString() === inputId);
    
    if (!user) {
      alert("ไม่พบผู้ใช้ในระบบ");
      return;
    }

    currentUser = user;
    localStorage.setItem("id", inputId);

    if (!user.password || user.password.trim() === "") {
      window.location.href = "form.html";
    } else {
      document.getElementById("passwordDiv").style.display = "block";
      document.getElementById("loginBtn").style.display = "inline-block";
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
