async function loadEvents() {
  const response = await fetch("events.json");
  let events = await response.json();

  const now = new Date();

  events = events
    .filter((event) => parseICSDate(event.end) >= now)
    .sort((a, b) => parseICSDate(a.start) - parseICSDate(b.start));

  const container = document.getElementById("events-list");
  container.innerHTML = "";

  if (events.length === 0) {
    container.innerHTML = "<p>Momentálně nejsou naplánované žádné akce.</p>";
    return;
  }

  events.forEach((event) => {
    const item = document.createElement("div");
    item.className = "event-item";
    item.innerHTML = `
      <h3>${event.title}</h3>
      <p>${event.description}</p>
      <p><strong>Kdy:</strong> ${formatDate(event.start)}</p>
      <p><strong>Kde:</strong> ${event.location}</p>
      <button type="button">Přidat do kalendáře</button>
    `;
    item.querySelector("button").addEventListener("click", () => downloadICS(event));
    container.appendChild(item);
  });
}

function parseICSDate(icsDate) {
  const iso = `${icsDate.slice(0, 4)}-${icsDate.slice(4, 6)}-${icsDate.slice(6, 11)}:${icsDate.slice(11, 13)}:${icsDate.slice(13, 15)}Z`;
  return new Date(iso);
}

function formatDate(icsDate) {
  return parseICSDate(icsDate).toLocaleString("cs-CZ");
}

function escapeICS(text) {
  return text.replace(/,/g, "\\,").replace(/;/g, "\\;");
}

function downloadICS(event) {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    `DTSTART:${event.start}`,
    `DTEND:${event.end}`,
    `SUMMARY:${escapeICS(event.title)}`,
    `DESCRIPTION:${escapeICS(event.description)}`,
    `LOCATION:${escapeICS(event.location)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${event.title}.ics`;
  link.click();
  URL.revokeObjectURL(link.href);
}

document.addEventListener("DOMContentLoaded", loadEvents);