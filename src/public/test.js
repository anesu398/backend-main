document.addEventListener('DOMContentLoaded', () => {
    loadHistory();
});

function openTab(evt, tabId) {
    const tabContents = document.querySelectorAll(".tab-content");
    const tabButtons = document.querySelectorAll(".tab-button");

    tabContents.forEach(tab => tab.classList.remove("active"));
    tabButtons.forEach(btn => btn.classList.remove("active"));

    document.getElementById(tabId).classList.add("active");
    evt.currentTarget.classList.add("active");
}

function addHeader(containerId) {
    const container = document.getElementById(containerId);
    const paramDiv = document.createElement("div");
    paramDiv.className = "param";
    paramDiv.innerHTML = `
        <input type="text" placeholder="Header Key">
        <input type="text" placeholder="Header Value">
    `;
    container.appendChild(paramDiv);
}

async function sendRequest(tabId) {
    const tabIndex = tabId.split('-')[1];
    const method = document.getElementById(`method-${tabIndex}`).value;
    const url = document.getElementById(`url-${tabIndex}`).value;
    const headersContainer = document.getElementById(`headers-${tabIndex}`);
    const body = document.getElementById(`body-${tabIndex}`).value;

    const headers = {};
    headersContainer.querySelectorAll(".param").forEach(param => {
        const key = param.querySelector("input:first-child").value;
        const value = param.querySelector("input:last-child").value;
        if (key && value) headers[key] = value;
    });

    const preRequestScript = document.getElementById(`pre-request-script-${tabIndex}`).value;
    const testScript = document.getElementById(`test-script-${tabIndex}`).value;

    if (preRequestScript) {
        eval(preRequestScript);
    }

    const options = {
        method,
        headers,
        body: body ? JSON.stringify(JSON.parse(body)) : null
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        document.getElementById(`response-content-${tabIndex}`).textContent = JSON.stringify(data, null, 2);

        if (testScript) {
            eval(testScript);
        }

        // Save request to history
        const request = {
            method,
            url,
            headers: Object.entries(headers).map(([key, value]) => ({ key, value })),
            body
        };
        saveRequestToHistory(request);

        // Visualize response data
        visualizeResponseData(data, tabIndex);
    } catch (error) {
        document.getElementById(`response-content-${tabIndex}`).textContent = "Error: " + error.message;
    }
}

function visualizeResponseData(data, tabIndex) {
    const ctx = document.getElementById(`response-chart-${tabIndex}`).getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(data),
            datasets: [{
                label: 'Response Data',
                data: Object.values(data),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function saveRequestToHistory(request) {
    const history = JSON.parse(localStorage.getItem("history")) || [];
    history.push(request);
    localStorage.setItem("history", JSON.stringify(history));
    loadHistory();
}

function loadHistory() {
    const historyContainer = document.getElementById("history");
    const history = JSON.parse(localStorage.getItem("history")) || [];
    historyContainer.innerHTML = "";
    history.forEach((request, index) => {
        const historyItem = document.createElement("div");
        historyItem.className = "history-item";
        historyItem.innerText = `${request.method} ${request.url}`;
        historyItem.onclick = () => loadHistoryItem(request);
        historyContainer.appendChild(historyItem);
    });
}

function loadHistoryItem(historyItem) {
    const currentTab = document.querySelector(".tab-content.active");
    const tabIndex = currentTab.id.split('-')[1];

    document.getElementById(`method-${tabIndex}`).value = historyItem.method;
    document.getElementById(`url-${tabIndex}`).value = historyItem.url;

    const headersContainer = document.getElementById(`headers-${tabIndex}`);
    headersContainer.innerHTML = "";
    historyItem.headers.forEach(header => {
        const paramDiv = document.createElement("div");
        paramDiv.className = "param";
        paramDiv.innerHTML = `
            <input type="text" value="${header.key}" placeholder="Header Key">
            <input type="text" value="${header.value}" placeholder="Header Value">
        `;
        headersContainer.appendChild(paramDiv);
    });

    document.getElementById(`body-${tabIndex}`).value = historyItem.body;
}
async function fetchEnvironments() {
    try {
        const response = await fetch('/environments');
        const environments = await response.json();
        const envList = document.getElementById('env-list');
        envList.innerHTML = '';
        environments.forEach(env => {
            const div = document.createElement('div');
            div.textContent = env.name;
            envList.appendChild(div);
        });
    } catch (error) {
        console.error('Error fetching environments:', error);
    }
}

async function addEnvironment() {
    const name = document.getElementById('env-name').value;

    try {
        const response = await fetch('/environments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        });

        if (response.ok) {
            fetchEnvironments();
        } else {
            alert('Failed to add environment');
        }
    } catch (error) {
        console.error('Error adding environment:', error);
    }
}

// Fetch environments on page load if user is logged in
if (localStorage.getItem('user')) {
    fetchEnvironments();
    document.getElementById('logout-button').style.display = 'block';
}
function showLogin() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('signup-form').style.display = 'none';
}

function showSignup() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'block';
}

async function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    
    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        
        if (response.ok) {
            const user = await response.json();
            localStorage.setItem('user', JSON.stringify(user));
            document.getElementById('logout-button').style.display = 'block';
            document.getElementById('auth-forms').style.display = 'none';
            alert('Login successful');
        } else {
            alert('Login failed');
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

async function signup() {
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;

    try {
        const response = await fetch('/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        
        if (response.ok) {
            alert('Sign up successful. Please log in.');
            showLogin();
        } else {
            alert('Sign up failed');
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

function logout() {
    localStorage.removeItem('user');
    document.getElementById('logout-button').style.display = 'none';
    document.getElementById('auth-forms').style.display = 'block';
    alert('Logged out');
}
async function fetchComments(requestId) {
  try {
    const response = await fetch(`/comments/${requestId}`);
    const comments = await response.json();
    const commentList = document.getElementById('comment-list');
    commentList.innerHTML = '';
    comments.forEach(comment => {
      const div = document.createElement('div');
      div.textContent = `${comment.userId.username}: ${comment.content}`;
      commentList.appendChild(div);
    });
  } catch (error) {
    console.error('Error fetching comments:', error);
  }
}

async function addComment() {
  const content = document.getElementById('comment-content').value;
  const requestId = document.getElementById('request-id').value;

  try {
    const response = await fetch('/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ requestId, content })
    });

    if (response.ok) {
      fetchComments(requestId);
    } else {
      alert('Failed to add comment');
    }
  } catch (error) {
    console.error('Error adding comment:', error);
  }
}

// Fetch comments on page load if user is logged in
if (localStorage.getItem('user')) {
  const requestId = document.getElementById('request-id').value;
  fetchComments(requestId);
}
function generateCodeSnippet() {
    const method = document.getElementById('method').value;
    const url = document.getElementById('url').value;
    const headers = document.getElementById('headers').value;
    const body = document.getElementById('body').value;
  
    const snippets = {
      curl: `curl -X ${method} '${url}' -H '${headers}' -d '${body}'`,
      python: `import requests\n\nresponse = requests.${method.toLowerCase()}('${url}', headers=${headers}, json=${body})\nprint(response.json())`,
      javascript: `fetch('${url}', {\n  method: '${method}',\n  headers: ${headers},\n  body: JSON.stringify(${body})\n}).then(response => response.json()).then(data => console.log(data));`
    };
  
    document.getElementById('code-snippet').textContent = snippets[document.getElementById('language').value];
  }
  async function sendRequest() {
    const method = document.getElementById('method').value;
    const url = document.getElementById('url').value;
    const headers = JSON.parse(document.getElementById('headers').value || '{}');
    const body = JSON.parse(document.getElementById('body').value || '{}');
  
    try {
      const response = await fetch('/requests/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ method, url, headers, data: body })
      });
  
      const result = await response.json();
      document.getElementById('response').textContent = JSON.stringify(result.data, null, 2);
      document.getElementById('status').textContent = `Status: ${result.status}`;
      document.getElementById('response-time').textContent = `Response Time: ${result.responseTime} ms`;
    } catch (error) {
      document.getElementById('response').textContent = 'Error sending request';
      console.error('Error sending request:', error);
    }
  }
  async function fetchTests() {
    try {
      const response = await fetch('/tests');
      const tests = await response.json();
      const testList = document.getElementById('test-list');
      testList.innerHTML = '';
      tests.forEach(test => {
        const div = document.createElement('div');
        div.textContent = test.name;
        testList.appendChild(div);
      });
    } catch (error) {
      console.error('Error fetching tests:', error);
    }
  }
  
  async function addTest() {
    const name = document.getElementById('test-name').value;
  
    try {
      const response = await fetch('/tests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });
  
      if (response.ok) {
        fetchTests();
      } else {
        alert('Failed to add test');
      }
    } catch (error) {
      console.error('Error adding test:', error);
    }
  }
  
  // Fetch tests on page load if user is logged in
  if (localStorage.getItem('user')) {
    fetchTests();
  }
  async function fetchRequestGroups() {
    try {
      const response = await fetch('/request-groups');
      const requestGroups = await response.json();
      const requestGroupList = document.getElementById('request-group-list');
      requestGroupList.innerHTML = '';
      requestGroups.forEach(group => {
        const div = document.createElement('div');
        div.textContent = group.name;
        requestGroupList.appendChild(div);
      });
    } catch (error) {
      console.error('Error fetching request groups:', error);
    }
  }
  
  async function addRequestGroup() {
    const name = document.getElementById('request-group-name').value;
  
    try {
      const response = await fetch('/request-groups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });
  
      if (response.ok) {
        fetchRequestGroups();
      } else {
        alert('Failed to add request group');
      }
    } catch (error) {
      console.error('Error adding request group:', error);
    }
  }
  
  // Fetch request groups on page load if user is logged in
  if (localStorage.getItem('user')) {
    fetchRequestGroups();
  }
      