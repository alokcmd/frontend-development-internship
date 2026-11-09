
/*
 JobFinder - Testing and Quality Assurance

 How to Run:
 1. Open your Job Portal index.html in Chrome.
 2. Press F12.
 3. Open Console.
 4. Copy and paste this complete code.
 5. Press Enter.
*/

(function () {

    let results = [];

    function check(testName, condition) {
        let status = condition ? "PASS" : "FAIL";

        results.push({
            Test: testName,
            Result: status
        });

        console.log(status + " - " + testName);
    }

    console.log("===== JOB PORTAL TESTING STARTED =====");

    // TEST 1: Homepage
    check(
        "Homepage is loaded",
        document.querySelector("header") !== null
    );

    // TEST 2: Job List
    check(
        "Job list container exists",
        document.getElementById("jobList") !== null
    );

    // TEST 3: Job Cards
    check(
        "Jobs are displayed",
        document.querySelectorAll(".job-card").length > 0
    );

    // TEST 4: Search Function
    if (typeof searchJobs === "function") {

        let searchInput =
            document.getElementById("searchInput");

        searchInput.value = "Python";

        searchJobs();

        check(
            "Python job search works",
            document.getElementById("jobList")
                .innerText.toLowerCase()
                .includes("python")
        );

        // TEST 5: Invalid Search
        searchInput.value = "xyz123";

        searchJobs();

        check(
            "Invalid search displays no jobs message",
            document.getElementById("jobList")
                .innerText.toLowerCase()
                .includes("no jobs found")
        );

        // TEST 6: Empty Search
        searchInput.value = "";

        searchJobs();

        check(
            "Empty search displays all jobs",
            document.querySelectorAll(".job-card").length === jobs.length
        );

    } else {
        check("Search function exists", false);
    }

    // TEST 7: Apply Job
    if (jobs.length > 0 && typeof applyJob === "function") {

        applyJob(jobs[0].id);

        check(
            "Apply button opens application form",
            document.getElementById("application")
                .style.display === "block"
        );

        closeApplication();

    } else {
        check("Apply function exists", false);
    }

    // TEST 8: Add Job
    let oldCount = jobs.length;

    let testJob = {
        id: 999999,
        title: "Testing Developer",
        company: "Test Company",
        location: "Delhi",
        salary: "4 LPA"
    };

    jobs.push(testJob);

    displayJobs(jobs);

    check(
        "New job can be added",
        document.getElementById("jobList")
            .innerText.includes("Testing Developer")
    );

    // TEST 9: Delete Job
    jobs = jobs.filter(function (job) {
        return job.id !== 999999;
    });

    displayJobs(jobs);

    check(
        "Job can be deleted",
        jobs.length === oldCount
    );

    // FINAL TEST REPORT
    console.log("===== TESTING RESULTS =====");

    console.table(results);

    let passed = results.filter(
        item => item.Result === "PASS"
    ).length;

    let failed = results.filter(
        item => item.Result === "FAIL"
    ).length;

    console.log("Total Tests:", results.length);
    console.log("Passed:", passed);
    console.log("Failed:", failed);

    console.log("===== TESTING COMPLETED =====");

})();
