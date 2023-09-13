"use client";

import '../../globals.css'
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from "next/link";
import { usePathname } from 'next/navigation';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const tabs = [
  "/foo/bar",
  "/foo/baz",
  "/foo/qux",
];

function getTabIdx(tabs, path) {
  const idx = tabs.indexOf(path);
  if (idx === -1) {
    return 0;
  }
  return idx;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const path = usePathname();
  const tabIdx = getTabIdx(tabs, path);

  return (
    <>
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabIdx} aria-label="basic tabs example">
          <Tab label="Item One" {...a11yProps(0)} component={Link} href="/foo/bar" />
          <Tab label="Item Two" {...a11yProps(1)} component={Link} href="/foo/baz" />
          <Tab label="Item Three" {...a11yProps(2)} component={Link} href="/foo/qux" />
        </Tabs>
      </Box>
      <CustomTabPanel value={tabIdx} index={0}>
        Item One
      </CustomTabPanel>
      <CustomTabPanel value={tabIdx} index={1}>
        Item Two
      </CustomTabPanel>
      <CustomTabPanel value={tabIdx} index={2}>
        Item Three
      </CustomTabPanel>
    </Box>
    {children}
    </>
  )
}
