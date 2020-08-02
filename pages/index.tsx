import React from 'react';
import { CssBaseline, Typography } from '@material-ui/core';

import ArticleCard from '../components/ArticleCard';
import posts from '../data/blog-posts';

const Index = () => {
    return (
        <>
            <CssBaseline />
            <div>
                <div>
                    <Typography>Featured Blog Posts</Typography>
                </div>
                <div>
                    {posts.map((post, index) => (
                        <ArticleCard key={post.title} {...post} />
                    ))}
                </div>
            </div>
        </>
    );
};
export default Index;
