async function getGitHubProfile() {
  const username = document.getElementById('usernameInput').value.trim();
  const profileDiv = document.getElementById('profile');

  if (!username) {
    profileDiv.innerHTML = "<p>Please enter a username.</p>";
    return;
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
      throw new Error('User not found');
    }
    const data = await response.json();
    
    profileDiv.innerHTML = `
      <img src="${data.avatar_url}" alt="${data.login}">
      <h2>${data.name || data.login}</h2>
      <p>${data.bio || "No bio available"}</p>
      <p>Followers: ${data.followers} | Following: ${data.following}</p>
      <p>Public Repos: ${data.public_repos}</p>
      <a href="${data.html_url}" target="_blank">View Profile</a>
    `;
  } catch (error) {
    profileDiv.innerHTML = `<p>${error.message}</p>`;
  }
}
