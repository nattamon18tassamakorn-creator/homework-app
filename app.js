let homeworkList = [];

function addHomework() {
  const subject = document.getElementById("subject").value;
  const detail = document.getElementById("detail").value;
  const time = document.getElementById("time").value;

  if (!subject || !time) {
    alert("กรอกวิชาและเวลาให้ครบ");
    return;
  }

  const hw = { subject, detail, time };
  homeworkList.push(hw);
  render();
  scheduleNotification(hw);
}

function render() {
  const list = document.getElementById("list");
  list.innerHTML = "";

  homeworkList.forEach((hw, i) => {
    list.innerHTML += `
      <li>
        ${hw.subject} - ${hw.time}
        <button onclick="removeHomework(${i})">ลบ</button>
      </li>
    `;
  });
}

function removeHomework(i) {
  homeworkList.splice(i, 1);
  render();
}

function scheduleNotification(hw) {
  if (Notification.permission !== "granted") {
    Notification.requestPermission();
  }

  const delay = new Date(hw.time) - new Date();
  if (delay > 0) {
    setTimeout(() => {
      new Notification("ถึงเวลาการบ้าน", {
        body: hw.subject
      });
    }, delay);
  }
  }
