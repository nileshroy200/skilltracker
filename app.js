function updateTime() {
  const now = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  document.getElementById("current-date").textContent = now.toLocaleDateString(
    "en-US",
    options
  );
  document.getElementById("current-time").textContent =
    now.toLocaleTimeString();
}
setInterval(updateTime, 1000);
updateTime();

// Funtion for popup window and update profile informations

document
  .getElementById("edit-profile-button")
  .addEventListener("click", function () {
    document.getElementById("edit-profile-popup").style.display = "block";
  });

document.getElementById("close-button").addEventListener("click", function () {
  document.getElementById("edit-profile-popup").style.display = "none";
});

document
  .getElementById("edit-profile-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const bio = document.getElementById("bio").value;
    const avatar = document.getElementById("avatar").files[0];

    document.querySelector(".user-info h2").textContent = name;
    document.querySelector(".user-info p").textContent = bio;

    if (avatar) {
      const reader = new FileReader();
      reader.onload = function (e) {
        document.querySelector(".avatar img").src = e.target.result;
      };
      reader.readAsDataURL(avatar);
    }

    document.getElementById("edit-profile-popup").style.display = "none";
  });

  // Template for card

let goalElem = `
         <form id="update-goal-form" autocomplete="off">

          <div class="skill-panel">
            <div class="skill-name">
              <textarea class="editable" type="text" id="goal-name" name="goal-name" placeholder="Write your goal/skill" required readonly autocomplete="off"/></textarea>
            </div>

            <div class="skill-info">
              <div class="data">
                <div class="dat"><input class="dat editable" type="date" id="start-date" name="start-date" required readonly autocomplete="off"/></div>
                <div class="dat"><input class="dat editable" type="date" id="end-date" name="end-date" required readonly autocomplete="off"/></div>
                <div class="dat">
                  <select class="dat editable" id="status" name="status" required disabled autocomplete="off">
                    <option value="not-started">Not Started</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div class="dat"><p class="dat editable time-remain">0 days </p></div>
              </div>
              <div class="progress-data">
                <label class="prog-label" for="progress">Progress</label>
                <progress id="progress" name="progress" value="0" max="100"></progress>
                <input class="dat editable" type="number" id="progress-input" name="progress-input" value="" max="100" style="display: none;" placeholder="Input your progress(%)"/>
                <input class="dat editable" type="number" id="progress-input" name="progress-input" value="0" max="100"
                  style="display: none;" />
                
              </div>
            </div>
          </div>

          <div class="resources-panel">
            <div class="res-name">
              <h4>Add Resources Link</h4>
            </div>
            <div id="resources">
              <input class="editable" type="url" name="resource1" placeholder="Notion Note" readonly autocomplete="off"/>
              <input class="editable" type="url" name="resource2" placeholder="Roadmap" readonly autocomplete="off"/>
              <input class="editable" type="url" name="resource3" placeholder="E-book" readonly autocomplete="off"/>
              <input class="editable" type="url" name="resource4" placeholder="Course" readonly autocomplete="off"/>
              <input class="editable" type="url" name="resource5" placeholder="Video" readonly autocomplete="off"/>
              <input class="editable" type="url" name="resource5" placeholder="Reading" readonly autocomplete="off"/>
              <div class="div"></div>
              <button type="button" class="edit-button card-button">Edit Card</button>
              <button type="submit" class="save-button card-button" style="display: none;">Save</button>
              <button type="button" class="delete-button card-button">Delete Card</button>
            </div>
          </div>
        </form>
  `;

function calculateDaysLeft(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

function createGoalCard() {
  const mainwrap = document.getElementById("mainwrap");
  const newCard = document.createElement("div");
  newCard.className = "goal-card";
  newCard.innerHTML = goalElem;
  mainwrap.appendChild(newCard);

  // Add event listeners to the newly created elements
  newCard.querySelector(".edit-button").addEventListener("click", function () {
    newCard.querySelector("#goal-name").removeAttribute("readonly");
    newCard.querySelector("#start-date").removeAttribute("readonly");
    newCard.querySelector("#end-date").removeAttribute("readonly");
    newCard.querySelector("#progress").style.display = "none";
    newCard.querySelector("#progress-input").style.display = "inline";
    newCard.querySelector("#status").removeAttribute("disabled");
    newCard.querySelectorAll("#resources input").forEach((input) => input.removeAttribute("readonly"));
    newCard.querySelector(".edit-button").style.display = "none";
    newCard.querySelector(".save-button").style.display = "inline";
  });

  newCard.querySelector(".delete-button").addEventListener("click", function () {
    mainwrap.removeChild(newCard);
  });

  newCard.querySelector("#update-goal-form").addEventListener("submit", function (event) {
    event.preventDefault();
    newCard.querySelector("#goal-name").setAttribute("readonly", true);
    newCard.querySelector("#start-date").setAttribute("readonly", true);
    newCard.querySelector("#end-date").setAttribute("readonly", true);
    const progressValue = newCard.querySelector("#progress-input").value;
    newCard.querySelector("#progress").value = progressValue;
    newCard.querySelector("#progress").style.display = "inline";
    newCard.querySelector("#progress-input").style.display = "none";
    newCard.querySelector("#status").setAttribute("disabled", true);
    newCard.querySelectorAll("#resources input").forEach((input) => {
      input.setAttribute("readonly", true);
      input.addEventListener("click", function () {
        if (input.value) {
          window.open(input.value, "_blank");
        }
      });
    });
    newCard.querySelector(".edit-button").style.display = "inline";
    newCard.querySelector(".save-button").style.display = "none";

    // Calculate and display the remaining days
    const startDate = newCard.querySelector("#start-date").value;
    const endDate = newCard.querySelector("#end-date").value;
    const daysLeft = calculateDaysLeft(startDate, endDate);
    newCard.querySelector(".time-remain").textContent = `${daysLeft} days left`;
  });
}

// Create a default goal card when the page loads
document.addEventListener("DOMContentLoaded", function () {
  createGoalCard();
});

document.getElementById("add-goal-button").addEventListener("click", function () {
  createGoalCard();
});