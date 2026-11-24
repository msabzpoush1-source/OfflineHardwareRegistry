
"use strict";

const STORAGE_KEY = "hardware_registry_v1";

const defaultData = {
    devices: [],
    components: [],
    drafts: [],
    history: [],
    registrant: ""
};

function loadData() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? { ...defaultData, ...JSON.parse(saved) } : { ...defaultData };
    } catch (error) {
        console.error("خطا در خواندن اطلاعات:", error);
        return { ...defaultData };
    }
}

let appData = loadData();

function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
    updateDashboard();
}

function toPersianNumber(value) {
    return String(value).replace(/\d/g, digit => "۰۱۲۳۴۵۶۷۸۹"[digit]);
}

function updateDashboard() {
    document.getElementById("deviceCount").textContent =
        toPersianNumber(appData.devices.length);

    const activeComponents = appData.components.filter(
        component => component.active !== false
    );

    document.getElementById("componentCount").textContent =
        toPersianNumber(activeComponents.length);
}

function setStatus(message) {
    document.getElementById("appStatus").textContent = message;
}

function createId() {
    if (crypto.randomUUID) return crypto.randomUUID();

    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, char => {
        const random = Math.random() * 16 | 0;
        return (char === "x" ? random : (random & 3 | 8)).toString(16);
    });
}

document.getElementById("newDeviceBtn").addEventListener("click", () => {
    const name = prompt("نام یا عنوان دستگاه را وارد کنید:");

    if (!name || !name.trim()) return;

    const device = {
        id: createId(),
        name: name.trim(),
        createdAt: new Date().toISOString()
    };

    appData.devices.push(device);

    appData.history.push({
        id: createId(),
        type: "DEVICE_CREATED",
        description: "ثبت دستگاه: " + device.name,
        createdAt: new Date().toISOString()
    });

    saveData();
    setStatus("دستگاه با موفقیت ثبت شد.");
});

document.getElementById("deviceListBtn").addEventListener("click", () => {
    if (appData.devices.length === 0) {
        alert("هنوز دستگاهی ثبت نشده است.");
        return;
    }

    const list = appData.devices
        .map((device, index) =>
            `${toPersianNumber(index + 1)}. ${device.name}`
        )
        .join("\n");

    alert("فهرست دستگاه‌ها:\n\n" + list);
});

document.getElementById("draftsBtn").addEventListener("click", () => {
    alert("تعداد پیش‌نویس‌ها: " + toPersianNumber(appData.drafts.length));
});

document.getElementById("exportBtn").addEventListener("click", () => {
    setStatus("بخش خروجی ZIP در مرحله بعد تکمیل خواهد شد.");
});

document.getElementById("settingsBtn").addEventListener("click", () => {
    const current = appData.registrant || "";
    const name = prompt("نام ثبت‌کننده را وارد کنید:", current);

    if (name === null) return;

    appData.registrant = name.trim();
    saveData();
    setStatus("تنظیمات ثبت‌کننده ذخیره شد.");
});

updateDashboard();

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("./service-worker.js")
            .then(() => setStatus("برنامه آماده است."))
            .catch(error => console.error("Service Worker:", error));
    });
}
