const sidebarItems = document.querySelectorAll(".nav-item");
const bellBtn = document.querySelector(".bell");
const calenderBtn = document.querySelector(".calender-icon");
const calenderCancel = document.querySelector(".calender-btn.cancel");
const sidebarBtn = document.querySelector(".sidebar-icon");
const sidebarClose = document.querySelector(".sidebar-close");
const monthYearDisplay = document.querySelector(".monthYearDisplay");
const daysOfMonthDisplay = document.querySelector(".days-of-month");
const prevMonth = document.querySelector(".prevMonth");
const nextMonth = document.querySelector(".nextMonth");
const todayBtn = document.getElementById("today");
const salesChart = document.querySelector("#sales_chart").getContext("2d");
const customersChart = document
    .querySelector("#customers_chart")
    .getContext("2d");
const paymentsChart = document
    .querySelector("#payments_chart")
    .getContext("2d");


// sidebar
sidebarItems.forEach((item) => {
    item.addEventListener("click", () => {
        sidebarItems.forEach((i) => i.classList.remove("active"));
        item.classList.toggle("active");
    });
});


sidebarBtn.addEventListener("click", () => {
    document.querySelector(".sidebar").classList.toggle("show");
})

// // notification
bellBtn.addEventListener("click", () => {
    document.querySelector(".notifications-panel").classList.toggle("show");
});

// calender window  
calenderBtn.addEventListener("click", () => {
    calenderBtn.classList.toggle("active");
    calenderBtn.parentElement.classList.toggle("show");
})

calenderCancel.addEventListener("click", () => {
    calenderBtn.classList.remove("active");
    calenderBtn.parentElement.classList.remove("show");
})

const today = new Date();
let month = today.getMonth();
let year = today.getFullYear();

function calenderGenerator(month, year) {

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 
        'August', 'September', 'October', 'November', 'December'
    ];

    monthYearDisplay.textContent = `${monthNames[month]} ${year}`

    // erase days of chose month
    daysOfMonthDisplay.textContent = '';

    const firstDay = new Date(year, month).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();


    for (let i = 0; i < firstDay; i++) {
        const div = document.createElement("div");
        div.classList.add("day-of-month", "day-of-prev-month");
        div.textContent = daysInPrevMonth - i;
        daysOfMonthDisplay.appendChild(div);
    }

    for ( let day = 1; day <= daysInMonth; day++) {
        const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
        daysOfMonthDisplay.innerHTML += `<div class="day-of-month ${isToday ? 'current-day' : ''}">${day}</div>`
    }
}

calenderGenerator(month, year);

// // calenders' buttons handling
prevMonth.addEventListener("click", () => {
    month--;
    if (month < 0) {
        month = 11;
        year--;
    }
    calenderGenerator(month, year);
})

nextMonth.addEventListener("click", () => {
    month++;
    if (month > 11) {
        month = 0;
        year++;
    }
    calenderGenerator(month, year);
})

todayBtn.addEventListener("click", () => {
    calenderGenerator(new Date().getMonth(), new Date().getFullYear());
})

// charts
const chartsData = {
    salesData: {
        labels: ["Completed", "Pending", "In Progress", "Cancelled"],
        datasets: [
            {
                label: "",
                data: [150, 150, 100, 60],
                backgroundColor: ["#FF8200", "#FFB466", "#FFD2A3", "#FFE1C2"],
                hoverOffest: 10,
                borderRadius: 6,
                spacing: 5,
            },
        ],
    },

    customersData: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
            {
                label: "Customers",
                data: [65, 59, 80, 81, 56, 55, 40],
                backgroundColor: ["#A78FE6", "#CBE0CC"],
                barThickness: 15,
                maxBarThickness: 20,
                borderRadius: 8,
            },
        ],
    },

    paymentsData: {
        labels: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
        ],
        datasets: [
            {
                label: "unpaid",
                data: [4000, 4000, 4800, 4000, 4000, 4800, 4000],
                fill: false,
                borderColor: "#725CFF",
                pointBackgroundColor: "#3A1CFC",
                pointBorderColor: "#fff",
                pointBorderWidth: 3,
                pointRadius: 0,
                pointHitRadius: 8,
                tension: 0.3,
            },
            {
                label: "paid",
                data: [3000, 3000, 3800, 3000, 3000, 3800, 3000],
                fill: false,
                borderColor: "#31C2F6",
                pointBackgroundColor: "#0095FF",
                pointBorderColor: "#fff",
                pointBorderWidth: 2,
                pointRadius: 0,
                pointHitRadius: 8,
                tension: 0.3,
            },
        ],
    },
};

const saleChartOptions = {
    cutout: "80%",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            enabled: true,
        },
    },
};
const customerChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            enabled: true,
            cartSize: 10
        },
    },
    scales: {
        x: {
            offset: true,
            grid: {
                display: false,
            },
        },
        y: {
            ticks: {
                display: false,
                stepSize: 18,
            },
            grid: {
                display: true,
                drawOnChartArea: true,
                drawTicks: false,
                lineWidth: 2,
            },
            border: {
                display: false,
                dash: [5, 14],
            },
        },
    },
};

const paymentChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            enabled: true,
        },
    },
    scales: {
        x: {
            offset: true,
            grid: {
                display: false
            },
            ticks: {
                font: {
                    size: 12,
                    weight: "semibold" 
                },
                color: "#646464",
                padding: 0,
            },
        },
        y: {
            beginAtZero: true,
            min: 0,
            max: 5000,
            ticks: {
                stepSize: 1000,
                callback: function (value) {
                    return value / 1000 + "k"
                }, 
                
            },
            grid: {
                lineWidth: 1,
            },
            border: {
                dash: [5, 10],
            },
        },
    },
};

const sales = new Chart(salesChart, {
    type: "doughnut",
    data: chartsData.salesData,
    options: saleChartOptions,
});

const customers = new Chart(customersChart, {
    type: "bar",
    data: chartsData.customersData,
    options: customerChartOptions,
});

const payments = new Chart(paymentsChart, {
    type: "line",
    data: chartsData.paymentsData,
    options: paymentChartOptions,
});
