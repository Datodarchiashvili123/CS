const web = document.getElementById("web");

fetch("https://dogapi.dog/api/v2/breeds")
    .then(response => response.json())
    .then(body => {
        body.data.forEach(item => {
        const dog = item.attributes;

        let colors = dog.coat && dog.coat.colors ? dog.coat.colors.join(", ") : "უცნობია";
        let temperament = dog.traits && dog.traits.temperament ? dog.traits.temperament.join(", ") : "უცნობია";
        let otherNames = dog.other_names && dog.other_names.length > 0 ? dog.other_names.join(", ") : "არ აქვს";
        let recognizedBy = dog.recognized_by && dog.recognized_by.length > 0 ? dog.recognized_by.join(", ") : "უცნობია";

        web.innerHTML += `
            <div style="border: 1px solid #060606; padding: 15px; margin-bottom: 20px; border-radius: 8px;">
            
            ${dog.images && dog.images[0] ? `<img src="${dog.images[0].url}" width="300" style="border-radius: 8px;">` : ''}
            <h2>${dog.name}</h2>
            <p><strong>აღწერა:</strong> ${dog.description}</p>
            <p><strong>ჰიპოალერგიული:</strong> ${dog.hypoallergenic ? "დიახ" : "არა"}</p>
            <p><strong>სიცოცხლის ხანგრძლივობა:</strong> ${dog.life.min} - ${dog.life.max} წელი</p>
            <p><strong>მამრის წონა:</strong> ${dog.male_weight.min} - ${dog.male_weight.max} კგ</p>
            <p><strong>მდედრის წონა:</strong> ${dog.female_weight.min} - ${dog.female_weight.max} კგ</p>
            <p><strong>მამრის სიმაღლე:</strong> ${dog.male_height.min} - ${dog.male_height.max} სმ</p>
            <p><strong>მდედრის სიმაღლე:</strong> ${dog.female_height.min} - ${dog.female_height.max} სმ</p>
            <p><strong>წარმოშობა:</strong> ${dog.origin.country} (${dog.origin.region}, ${dog.origin.era})</p>
            <p><strong>ბეწვი:</strong> ${dog.coat.type}, სიგრძე: ${dog.coat.length}</p>
            <p><strong>ფერები:</strong> ${colors}</p>
            <p><strong>ხასიათი:</strong> ${temperament}</p>
            <p><strong>სხვა სახელები:</strong> ${otherNames}</p>
            <p><strong>აღიარებული ორგანიზაციები:</strong> ${recognizedBy}</p>
            
            </div>
        `;
    });
});
