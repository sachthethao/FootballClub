// Hàm lấy dữ liệu từ backend
const fetchData = async (action) => {
  try {
    const response = await fetch(`http://realmadrid.io.vn/backend/index.php?action=${action}`);
    if (!response.ok) throw new Error('Network error');
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${action}:`, error);
    return null;
  }
};

// Hiển thị tin tức
const loadNews = async () => {
  const news = await fetchData('get_news') || [];
  const hotList = document.getElementById('hotList');
  const hotHit = document.getElementById('hotHit');
  const hotSup = document.getElementById('hotSup');

  if (news.length) {
    hotList.innerHTML = news.slice(0, 6).map(n => `
      <div class="hotListbase">
        <div><img src="${n.image_url || '/img/Alvarez.jpg'}" alt="${n.title}" /></div>
        <div>${n.title}</div>
      </div>
    `).join('');
    hotHit.innerHTML = `
      <div><img src="${news[0].image_url || '/img/Bruno.jpg'}" alt="${news[0].title}" /></div>
      <div>${news[0].title}</div>
    `;
    hotSup.innerHTML = news.slice(1, 4).map(n => `
      <div class="hotSupbase">
        <div><img src="${n.image_url || '/img/Alvarez.jpg'}" alt="${n.title}" /></div>
        <div>${n.title}</div>
      </div>
    `).join('');
  }
};

// Hiển thị lịch thi đấu
const loadSchedule = async () => {
  const events = await fetchData('get_schedule') || [];
  const scheduleList = document.getElementById('scheduleList');
  if (events.length) {
    scheduleList.innerHTML = `
      <div class="tableDay">${events.slice(0, 10).map(e => `<p>${e.match_date.slice(5)}</p>`).join('')}</div>
      <div class="tableClub">${events.slice(0, 10).map(e => `<p>${e.match_hometeam_name} - ${e.match_awayteam_name}</p>`).join('')}</div>
    `;
  }
};

// Hiển thị bảng xếp hạng
const loadStandings = async () => {
  const standings = await fetchData('get_standings') || [];
  const tbody = document.querySelector('#standingsTable tbody');
  if (standings.length) {
    tbody.innerHTML = standings.slice(0, 10).map(s => `
      <tr>
        <td>${s.overall_league_position}</td>
        <td>${s.team_name}</td>
        <td>${s.overall_league_payed}</td>
        <td>${s.overall_league_GF - s.overall_league_GA}</td>
        <td>${s.overall_league_PTS}</td>
      </tr>
    `).join('');
  }
};

// Hiển thị cầu thủ
const loadPlayers = async () => {
  const players = await fetchData('get_players') || [];
  const playersList = document.getElementById('playersList');
  if (players.length) {
    playersList.innerHTML = players.slice(0, 5).map(p => `
      <div class="playerInfo">
        <div><img src="${p.player_image || '/img/Endrick.png'}" alt="${p.player_name}" /></div>
        <div>${p.player_name}</div>
        <div>${p.player_type} ${p.player_age}</div>
      </div>
    `).join('');
  }
};

// Hiển thị HLV
const loadCoaches = async () => {
  const coaches = await fetchData('get_coaches') || [];
  const coachList = document.getElementById('coachList');
  if (coaches.length) {
    coachList.innerHTML = coaches.slice(0, 1).map(c => `
      <div><img src="${c.coach_image || '/img/Ancelotti.png'}" alt="${c.coach_name}" /></div>
      <div>${c.coach_name}</div>
      <div>Coach ${c.coach_age || '60'}</div>
    `).join('');
  }
};

// Tải dữ liệu khi trang sẵn sàng
document.addEventListener('DOMContentLoaded', () => {
  loadNews();
  loadSchedule();
  loadStandings();
  loadPlayers();
  loadCoaches();
});