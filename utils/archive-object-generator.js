export default class ArchiveObjectGenerator {
    generateArchive(postses) {
        const archiv = {};
        const posts = postses;
        
        for(let i = 0; i < posts.length; i++) {
            posts[i].created_at = new Date(posts[i].created_at);
            posts[i].year = posts[i].created_at.getFullYear();
            posts[i].month = posts[i].created_at.getMonth()+1;
        }

        for(let i = 0; i < posts.length; i++) {
            if (!archiv.hasOwnProperty(posts[i].year)) {
				archiv[posts[i].year] = {};
			}
			if (!archiv[posts[i].year].hasOwnProperty(posts[i].month)) {
				archiv[posts[i].year][posts[i].month] = [];
			}
			archiv[posts[i].year][posts[i].month].push({
				id: posts[i].id,
				title: posts[i].title
			});
        }
        
        return archiv;
    }
}