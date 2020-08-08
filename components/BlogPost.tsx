import React, { useState, useEffect, useContext } from 'react';
import posts, { Post } from '../data/blog-posts';
import { Container } from '@material-ui/core';
import RhythmImage from './Image';
import styled, { css } from 'styled-components';
import RhythmCodeBlock from './CodeBlock';

import { useTypography } from '../libs/useTypography';

interface BlogPostProps {
    meta: Omit<Post, 'path'>;
    children: JSX.Element | JSX.Element[];
}
const BlogPost = (props: BlogPostProps) => {
    const current = posts.map(({ title }) => title).indexOf(props.meta.title);
    const next = posts[current - 1];
    const prev = posts[current + 1];

    const [children, setChildren] = useState(props.children);
    useEffect(() => {
        let children = Array.isArray(props.children)
            ? props.children
            : [props.children];
        children = childrenMapping(children);
        setChildren(children);
    }, []);

    const typography = useTypography();

    const BlogContainer = styled(Container)`
        /* background-position: -1px -1px;
        background-image: linear-gradient(
                to right,
                rgba(50, 50, 100, 0.25) 1px,
                transparent 1px
            ),
            linear-gradient(rgba(50, 50, 100, 0.25) 1px, transparent 1px);
        background-size: ${typography.rhythmHeight(
            1
        )} ${typography.rhythmHeight(1)}; */

        p {
            ${typography.rhythmCss(2)}
            margin-block-start: ${typography.rhythmHeight(1)};
            margin-block-end: ${typography.rhythmHeight(1)};

            code {
                ${typography.rhythmCss(1)}
                display: inline-block;
                margin-bottom: -1px;
            }
        }

        pre {
            min-height: ${typography.rhythmHeight(2)};
            background-color: lightgray;
            overflow: hidden;
            code {
                ${typography.rhythmCss(1)}
                display: inline-block;
                position: absolute;
                padding: ${typography.rhythmHeight(
                    0.5
                )} ${typography.rhythmHeight(1)};
            }
        }


        a {
            ${typography.rhythmCss(2)}
        }

        ul {
            margin: 0px;
            /* margin-block-start: ${typography.rhythmHeight(1)}; */
            margin-block-end: ${typography.rhythmHeight(1)};
            li {
                ${typography.rhythmCss(2)}
            }
        }

        ol {
            ${typography.rhythmCss(2)}
            /* margin-block-start: ${typography.rhythmHeight(1)}; */
            margin-block-end: ${typography.rhythmHeight(1)};
        }

        blockquote {
            ${typography.rhythmCss(2)}
            margin-block-start: ${typography.rhythmHeight(0.5)};
            margin-block-end: ${typography.rhythmHeight(0.5)};
        }

        pre {
            line-height: calc(1.85 * ${typography.rhythm.getBaseFontSize()}em) ;
            margin: 0px;
        }

        img {
            width: 100%;
        }

        h1 {
            ${typography.rhythmCss(6)}
            padding-bottom: 1px;
        }
        h2 {
            ${typography.rhythmCss(5)}
        }
        h3 {
            ${typography.rhythmCss(4)}
            padding-bottom: 1px;
        }
        h4 {
            ${typography.rhythmCss(3)}
        }
        h5 {
            ${typography.rhythmCss(2)}
        }
        h6 {
            ${typography.rhythmCss(1)}
        }
    `;

    return (
        <>
            <BlogContainer maxWidth="md">
                <h1>{props.meta.title}</h1>
                {children}
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
            </BlogContainer>
        </>
    );
};

const childrenMapping = (children: any, level: number = 0) => {
    return children.map((child, i) => {
        const descendants = child?.props?.children;
        if (descendants?.props?.mdxType === 'img') {
            child = <RhythmImage key={i} src={descendants.props.src} />;
        } else if (child?.props?.mdxType === 'pre') {
            child = <RhythmCodeBlock key={i}>{child}</RhythmCodeBlock>;
        }
        return child;
    });
};

interface PostNavigationProps {
    href: string;
    position: string;
    title: string;
}
const PostNavigation = (props: PostNavigationProps) => (
    <a href={props.href}>
        {props.position}{' '}
        {/* <Typography variant={'subtitle1'} component="h4">
            {props.title}
        </Typography> */}
    </a>
);

export default BlogPost;
