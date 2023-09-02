
// all data fetching using async
const fetchAsyncData = async (categoryId=1000) => {
    const url = `https://openapi.programming-hero.com/api/videos/category/${categoryId}`;
    const res = await fetch(url);
    const data = await res.json();
    const videos = data.data;
    displayAllData(videos);
}

// display all data
const displayAllData = (allData) => {
    // 1.get the parent element by id
    const videoContainer = document.getElementById('card-container');

    // clearing videos container
    videoContainer.innerText = '';

    allData.forEach(video => {
        // 2.create card by tag
        const videoCard = document.createElement('div');

        // set classlist
        videoCard.classList = `card`;

        // 3.set inner html
        videoCard.innerHTML = `
        <figure class="rounded-lg">
            <img class="w-full h-52" src="${video.thumbnail}"/>
        </figure>
        <div class="card-body px-0 flex flex-row gap-x-4">
            <img class="rounded-full w-10 h-10" src="${video.authors[0].profile_picture}"/>
            <div>
                <h3 class="text-[#171717] text-lg font-bold">${video.title}</h3>
                <h4 class="inline">${video.authors[0].profile_name}</h4> ${video.authors[0].verified}
                <h5>${video.others.views} views</h5>
            </div>
        </div>
        `

        // 4. append child to the parent element
        videoContainer.appendChild(videoCard);
    })
}

// showing all videos at default
fetchAsyncData();

// all video handler
const allHandler = () => {
    fetchAsyncData(1000);
}

// music button handler
const musicHandler = () => {
    fetchAsyncData(1001);
}

// comedy button handler
const comedyHandler = () => {
    fetchAsyncData(1003);
}

// drawing handler
const drawingHandler = () => {
    fetchAsyncData(1005);
}

// sorting by views
