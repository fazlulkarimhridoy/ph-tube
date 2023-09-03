// Global accesses
let videos


// all data fetching using async
const fetchAsyncData = async (categoryId = 1000) => {
    const url = `https://openapi.programming-hero.com/api/videos/category/${categoryId}`;
    const res = await fetch(url);
    const data = await res.json();
    videos = data.data;
    displayAllData(videos);
}

// display all data
const displayAllData = (allData) => {
    // 1.get the parent element by id
    const videoContainer = document.getElementById('card-container');

    // clearing videos container
    videoContainer.innerText = '';

    // show this details for empty data
    if (allData.length === 0) {
        videoContainer.classList.remove("text-left", "grid", "grid-cols-1", "md:grid-cols-2", "lg:grid-cols-4", "gap-4");
        videoContainer.classList.add("flex", "justify-center", "items-center", "pt-40");
        videoContainer.innerHTML = `
            <div class="flex justify-center ">
                <section class="container mx-auto" id="no-videos">
                <dvi class="flex justify-center items-center">
                    <img src="images/Icon.png" alt="">
                </dvi>
                <p class="text-[#171717] text-center text-4xl font-bold">Oops!! Sorry, There is no <br> content here</p>
                </section>
            </div>
        `;
    }
    else {
        videoContainer.classList.add("text-left", "grid", "grid-cols-1", "md:grid-cols-2", "lg:grid-cols-4", "gap-4");
        videoContainer.classList.remove("flex", "justify-center", "items-center");
    }


    allData.forEach(video => {
        // 2.create card by tag
        const videoCard = document.createElement('div');

        // set classlist
        videoCard.classList = `card`;

        //set blueTick
        let blueTick = ' ';
        if (video.authors[0].verified) {
            blueTick = `<img class="inline" src="images/blue.png"/>`;
        }

        // set posted hours & minutes
        let postedTime = ' ';
        if (video.others.posted_date) {
            const postedDate = parseInt(video.others.posted_date);
            postedHour = parseInt(postedDate / 3600);
            postedMinuteInSecond = postedDate % 3600;
            postedMinute = parseInt(postedMinuteInSecond / 60);
            postedTime = `
            <div class="bg-black text-white rounded-md w-1/3 text-center p-1 relative ml-60 mt-[-40px]">
                <p>${postedHour}hrs ${postedMinute}min ago</p>
            </div>
            `
        }

        // 3.set inner html
        videoCard.innerHTML = `
        <figure class="rounded-lg">
            <img class="w-full h-52" src="${video.thumbnail}"/>
        </figure>
        ${postedTime}
        <div class="card-body px-0 flex flex-row gap-x-4">
            <img class="rounded-full w-10 h-10" src="${video.authors[0].profile_picture}"/>
            <div>
                <h3 class="text-[#171717] text-lg font-bold">${video.title}</h3>
                <h4 class="inline">${video.authors[0].profile_name}</h4>  ${blueTick}
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


// sort handler
const sorHandler = () => {
    console.log("sort button clicked", videos);
    const sortArray = videos.sort(function (a, b) {
        var firstElement = parseFloat(a.others.views.slice(0, -1))
        var secondElement = parseFloat(b.others.views.slice(0, -1))
        return firstElement < secondElement ? 1 : -1;
    });

    // display sorted data
    displayAllData(sortArray);

}