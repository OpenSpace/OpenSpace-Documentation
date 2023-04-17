import React from 'react';
import Box from '@mui/system/Box';
import RedditIcon from '@mui/icons-material/Reddit';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import Link from '@mui/material/Link';

export default function Footer() {
  return (
    <Box
      sx={{
        display: 'flex',
        padding: '10px',
        alignSelf: 'center',
        flexWrap: 'wrap',
        gap: '15px'
        }}
    >
      <Link href="https://www.openspaceproject.com/">
        <HomeRoundedIcon />
      </Link>
      <Link href="https://www.reddit.com/r/OpenSpaceProject/">
        <RedditIcon fontSize={'medium'}/>
      </Link>
      <Link href="https://www.instagram.com/openspaceproj/">
        <InstagramIcon />
      </Link>
      <Link href="https://www.facebook.com/OpenSpaceProj/">
        <FacebookIcon />
      </Link>
      <Link href="https://www.youtube.com/@OpenSpaceProj">
        <YouTubeIcon />
      </Link>
      <Link href="https://twitter.com/openspaceproj">
        <TwitterIcon />
      </Link>
      <Link href="https://github.com/OpenSpace">
        <GitHubIcon />
      </Link>
      <Link href="mailto:support@openspaceproject.com">
        <EmailRoundedIcon />
      </Link>
      <Link href="http://wiki.openspaceproject.com/">Wiki</Link>
      <Link href="http://wiki.openspaceproject.com/docs/tutorials/">Tutorials</Link>
      <Link href="http://hub.openspaceproject.com/">Hub</Link>
      <Link href="https://mailchi.mp/amnh/openspacenewsletter">Newsletter</Link>
      <Link href="http://status.openspaceproject.com/">Server Status</Link>
    </Box>
  );
}