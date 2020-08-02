import React from 'react';
import posts, { Post } from '../data/blog-posts';
import { Typography } from '@material-ui/core';

interface BlogPostProps {
    meta: Omit<Post, 'path'>;
    children: JSX.Element;
}
const BlogPost = (props: BlogPostProps) => {
    const current = posts.map(({ title }) => title).indexOf(props.meta.title);
    const next = posts[current - 1];
    const prev = posts[current + 1];
    return (
        <>
            <div>
                <Typography>{props.meta.title}</Typography>
                {props.children}
                <hr />
                <div>
                    <div>
                        {prev && (
                            <PostNavigation
                                href={prev.path}
                                position="< Previous post"
                                title={prev.title}
                            />
                        )}
                    </div>
                    <div>
                        {next && (
                            <PostNavigation
                                href={next.path}
                                position="Next post >"
                                title={next.title}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

interface PostNavigationProps {
    href: string;
    position: string;
    title: string;
}
const PostNavigation = (props: PostNavigationProps) => (
    <a href={props.href}>
        {props.position} <Typography>{props.title}</Typography>
    </a>
);

export default BlogPost;
