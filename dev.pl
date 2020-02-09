#!/usr/bin/env perl

use strict;

use lib '../degens/buildlib/lib/';
use BuildLib;


my $cmd = shift;

if ($cmd eq 'serve') {
  sys("node mm.js ./etc/dev.js");
} elsif ($cmd eq 'dist') {
  BuildLib::fpm({
    types => [qw/ deb /],
    name => 'degens-mm',
    files => {
      'mm.js' => '/usr/degens/mm/mm.js',
      'mm-spawner.js' => '/usr/degens/mm/mm-spawner.js',
      'ReflectedPrices.js' => '/usr/degens/mm/ReflectedPrices.js',

      'schema.sqlite3' => '/usr/degens/mm/schema.sqlite3',

      'sys/degens-mm.service' => '/lib/systemd/system/degens-mm.service',
    },
    dirs => {
    },
    config_files => [
    ],
    postinst => 'sys/postinst',
    deps => [qw/
      nodejs
      sqlite3
      degens-jslib
      degens-common-nodemodules
    /],
  });
} else {
  die "unknown command: $cmd";
}
