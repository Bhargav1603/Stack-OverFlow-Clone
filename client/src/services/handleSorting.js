const handleSorting = (sortType, page = '') => {
    let temp = sortType;

    // if (page === 'users' && temp === 'Name') {
    //     temp = 'Username';
    // } else if (page === 'users' && temp === 'Popular') {
    //     temp = 'Popular users';
    // }

    switch (temp) {
        case 'Newest':
            return (a, b) => new Date(b.created) - new Date(a.created);
        // case 'New':
        //     return (a, b) => new Date(b.created) - new Date(a.created);
        // case 'New Users':
        //     return (a, b) => new Date(b.created) - new Date(a.created);
        case 'Top':
            return (a, b) =>
                b.answers.length + b.comments.length - (a.answers.length + a.comments.length);
        // case 'Active':
        //     return (a, b) =>
        //         b.posts_count + b.tags_count - (a.posts_count + a.tags_count);
        // case 'Views':
        //     return (a, b) => b.views - a.views;
        case 'Oldest':
            return (a, b) => new Date(a.created) - new Date(b.created);
        case 'Popular':
            return (a, b) => b.questions_count - a.questions_count;
        case 'Name':
            return (a, b) => a.skill.localeCompare(b.skill);
        // case 'Username':
        //     return (a, b) => a.username.localeCompare(b.username);
        // case 'Popular users':
        //     return (a, b) => b.views - a.views;
        default:
            break;
    }
};

export default handleSorting;