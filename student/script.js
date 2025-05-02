let currentUser = null;

async function checkId() {
  const studentId = document.getElementById('studentId').value.trim();
  if (!studentId) {
    alert("กรุณากรอกเลขประจำตัว");
    return;
  }

  const response = await fetch("https://script.google.com/macros/s/AKfycbzIH0e9L9trXFdeNAKefHuO4-yTG-jNbHFf_x0TVLFFNwQETMbqA5viMJt__fIFxXL92g/exec");
  const data = await response.json();

  const user = data.find(item => item["เลขประจำตัว"] == studentId);

  if (!user) {
    alert("ไม่พบผู้ใช้");
    return;
  }

  currentUser = user;
  localStorage.setItem("studentId", studentId);

  if (!user["รหัสผ่าน"]) {
    // ถ้ายังไม่มีรหัสผ่านให้ไปกรอกข้อมูล
    window.location.href = "form.html";
  } else {
    // แสดงช่องกรอกรหัสผ่าน
    document.getElementById("passwordDiv").style.display = "block";
    document.getElementById("loginBtn").style.display = "inline-block";
  }
}

function login() {
  const passwordInput = document.getElementById('password').value;
  if (passwordInput === currentUser["รหัสผ่าน"]) {
    localStorage.setItem("userData", JSON.stringify(currentUser));
    window.location.href = "profile.html";
  } else {
    alert("รหัสผ่านไม่ถูกต้อง");
  }
}
