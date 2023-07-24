In this project, I built a **Jobby App** using React, React Router DOM and a few third party npm packages.

### Refer to videos below:

<div style="text-align: center;">
  <video style="max-width:80%;box-shadow:0 2.8px 2.2px rgba(0, 0, 0, 0.12);outline:none;" loop="true" autoplay="autoplay" controls="controls" muted>
    <source src="https://assets.ccbp.in/frontend/content/react-js/jobby-app-success-output-v0.mp4" type="video/mp4">
  </video>
</div>
<br/>

### Aim

- To create an easy way to find and apply job applications for job seekers.

**Jobby App** is a Single Page Application(SPA) built using React, featuring multiple routes like login, home, jobs and jobDetails.

### Application Routes

<details>
<summary>Login</summary>

- Authenticating the user and directing to home if success. An authorization token received in response is stored in Cookies for further authorization.

</details>

<details>
<summary>Home</summary>

- An intuitive navigation menu to navigate across different routes.
- And a description to get started.
</details>

<details>
<summary>Jobs</summary>

- All available jobs data is presented in this page.
- Jobs can be filtered by using various filters `Employment Type`, `Salary Range`, and `Job Title Search`.
- All Jobs are fetched by making a HTTP GET request to **AllJobsApiUrl** using browsers Web API **fetch** function.
- Response data is parsed and all jobs are rendered.
- Implemented a failure view to handle HTTP request failure.
</details>

<details>
<summary>Job Details</summary>

- Job details and description about the job is presented in this page.
- Job data is fetched by making a HTTP GET request to **JobDetailsApiUrl** using browsers Web API **fetch** function.
- Response data is parsed and rendered.
- Implemented a failure view to handle HTTP request failure.
</details>

### User credentials

```text
 username: rahul
 password: rahul@2021

```

### Resources

<details>
<summary>Colors</summary>

<br/>
<div style="background-color: #64748b; width: 150px; padding: 10px; color: white">Hex: #64748b</div>
<div style="background-color: #4f46e5; width: 150px; padding: 10px; color: white">Hex: #4f46e5</div>
<div style="background-color: #f8fafc; width: 150px; padding: 10px; color: black">Hex: #f8fafc</div>
<div style="background-color: #272727; width: 150px; padding: 10px; color: white">Hex: #272727</div>
<div style="background-color: #ffffff; width: 150px; padding: 10px; color: black">Hex: #ffffff</div>
<div style="background-color: #b6c5ff; width: 150px; padding: 10px; color: black">Hex: #b6c5ff</div>
<div style="background-color: #6366f1; width: 150px; padding: 10px; color: white">Hex: #6366f1</div>
<div style="background-color: #2c364c; width: 150px; padding: 10px; color: white">Hex: #2c364c</div>
<div style="background-color: #000000; width: 150px; padding: 10px; color: white">Hex: #000000</div>
<div style="background-color: #f1f5f9; width: 150px; padding: 10px; color: black">Hex: #f1f5f9</div>
<div style="background-color: #fbbf24; width: 150px; padding: 10px; color: white">Hex: #fbbf24</div>
<div style="background-color: #202020; width: 150px; padding: 10px; color: white">Hex: #202020</div>
<div style="background-color: #cbd5e1; width: 150px; padding: 10px; color: black">Hex: #cbd5e1</div>
<div style="background-color: #7e858e; width: 150px; padding: 10px; color: black">Hex: #7e858e</div>
<div style="background-color: #121212; width: 150px; padding: 10px; color: white">Hex: #121212</div>
<div style="background-color: #475569; width: 150px; padding: 10px; color: white">Hex: #475569</div>
<div style="background-color: #ff0b37; width: 150px; padding: 10px; color: white">Hex: #ff0b37</div>
<br/>
</details>

<details>
<summary>Font-families</summary>

- Roboto
</details>
