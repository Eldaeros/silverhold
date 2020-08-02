import React from 'react';
import { Post } from '../data/blog-posts';
import { Typography } from '@material-ui/core';

interface ArticleCardProps extends Post {}

const ArticleCard = (props: ArticleCardProps) => {
    return (
        <div>
            <a href={props.path}>
                <div>
                    <div>
                        <div>
                            <Typography>{props.title}</Typography>
                            <Typography>{props.publishedAt}</Typography>
                            <img src={props.banner} />
                            <Typography>{props.summary}</Typography>
                            <Typography>Continue reading...</Typography>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    );
};

export default ArticleCard;
