(function () {
  function parseBib(text) {
    const entries = [];
    let i = 0;

    while (i < text.length) {
      const atIdx = text.indexOf('@', i);
      if (atIdx === -1) break;
      i = atIdx + 1;

      // Read type
      let typeEnd = i;
      while (typeEnd < text.length && text[typeEnd] !== '{' && text[typeEnd] !== '(') typeEnd++;
      const type = text.slice(i, typeEnd).trim().toLowerCase();
      i = typeEnd + 1;

      if (type === 'comment') {
        // Skip to matching brace/paren
        let depth = 1;
        while (i < text.length && depth > 0) {
          if (text[i] === '{' || text[i] === '(') depth++;
          else if (text[i] === '}' || text[i] === ')') depth--;
          i++;
        }
        continue;
      }

      // Read key
      let commaIdx = i;
      while (commaIdx < text.length && text[commaIdx] !== ',') commaIdx++;
      const key = text.slice(i, commaIdx).trim();
      i = commaIdx + 1;

      // Parse fields
      const fields = {};
      let depth = 1;

      while (i < text.length) {
        // Skip whitespace
        while (i < text.length && /\s/.test(text[i])) i++;
        if (i >= text.length) break;

        if (text[i] === '}' || text[i] === ')') { i++; break; }

        // Field name
        let fnEnd = i;
        while (fnEnd < text.length && text[fnEnd] !== '=' && text[fnEnd] !== '}') fnEnd++;
        if (text[fnEnd] === '}') { i++; break; }
        const fieldName = text.slice(i, fnEnd).trim().toLowerCase();
        i = fnEnd + 1; // skip '='

        // Skip whitespace
        while (i < text.length && /\s/.test(text[i])) i++;

        // Field value
        let value = '';
        if (text[i] === '{') {
          let d = 1; i++;
          const start = i;
          while (i < text.length && d > 0) {
            if (text[i] === '{') d++;
            else if (text[i] === '}') d--;
            i++;
          }
          value = text.slice(start, i - 1);
        } else if (text[i] === '"') {
          i++;
          const start = i;
          while (i < text.length && text[i] !== '"') { if (text[i] === '\\') i++; i++; }
          value = text.slice(start, i);
          i++;
        } else {
          const start = i;
          while (i < text.length && text[i] !== ',' && text[i] !== '}') i++;
          value = text.slice(start, i).trim();
        }

        if (fieldName) fields[fieldName] = value;

        // Skip comma
        while (i < text.length && /\s/.test(text[i])) i++;
        if (i < text.length && text[i] === ',') i++;
      }

      if (type !== 'string' && type !== 'preamble') {
        entries.push({ type, key, fields });
      }
    }

    return entries;
  }

  // Convert LaTeX diacritic commands to Unicode, then strip remaining braces.
  var diacritics = {
    '"': {a:'ä',e:'ë',i:'ï',o:'ö',u:'ü',y:'ÿ',A:'Ä',E:'Ë',I:'Ï',O:'Ö',U:'Ü',Y:'Ÿ'},
    "'": {a:'á',e:'é',i:'í',o:'ó',u:'ú',y:'ý',A:'Á',E:'É',I:'Í',O:'Ó',U:'Ú',Y:'Ý',c:'ć',n:'ń',s:'ś',z:'ź',C:'Ć',N:'Ń',S:'Ś',Z:'Ź'},
    '`': {a:'à',e:'è',i:'ì',o:'ò',u:'ù',A:'À',E:'È',I:'Ì',O:'Ò',U:'Ù'},
    '^': {a:'â',e:'ê',i:'î',o:'ô',u:'û',A:'Â',E:'Ê',I:'Î',O:'Ô',U:'Û'},
    '~': {a:'ã',n:'ñ',o:'õ',A:'Ã',N:'Ñ',O:'Õ'},
    '=': {a:'ā',e:'ē',i:'ī',o:'ō',u:'ū',A:'Ā',E:'Ē',I:'Ī',O:'Ō',U:'Ū'},
    '.': {a:'ȧ',e:'ė',g:'ġ',o:'ȯ',z:'ż',A:'Ȧ',E:'Ė',G:'Ġ',O:'Ȯ',Z:'Ż'},
    'u': {a:'ă',e:'ĕ',i:'ĭ',o:'ŏ',u:'ŭ',A:'Ă',E:'Ĕ',I:'Ĭ',O:'Ŏ',U:'Ŭ'},
    'v': {c:'č',e:'ě',n:'ň',r:'ř',s:'š',z:'ž',C:'Č',E:'Ě',N:'Ň',R:'Ř',S:'Š',Z:'Ž'},
    'H': {o:'ő',u:'ű',O:'Ő',U:'Ű'},
    'c': {c:'ç',C:'Ç',s:'ş',S:'Ş'},
    'k': {a:'ą',e:'ę',A:'Ą',E:'Ę'},
  };

  function latexToUnicode(str) {
    if (!str) return '';
    // \cmd{char}
    str = str.replace(/\\(['"`.^~=uvHck])\{([a-zA-Z])\}/g, function (_, cmd, ch) {
      return (diacritics[cmd] && diacritics[cmd][ch]) || ch;
    });
    // \cmd char  (no braces)
    str = str.replace(/\\(['"`.^~=])\s*([a-zA-Z])/g, function (_, cmd, ch) {
      return (diacritics[cmd] && diacritics[cmd][ch]) || ch;
    });
    str = str.replace(/\\ss\b/g, 'ß');
    str = str.replace(/\\AA\b/g, 'Å').replace(/\\aa\b/g, 'å');
    str = str.replace(/\\AE\b/g, 'Æ').replace(/\\ae\b/g, 'æ');
    str = str.replace(/\\OE\b/g, 'Œ').replace(/\\oe\b/g, 'œ');
    str = str.replace(/\\O\b/g, 'Ø').replace(/\\o\b/g, 'ø');
    str = str.replace(/\\L\b/g, 'Ł').replace(/\\l\b/g, 'ł');
    return str;
  }

  function stripBraces(str) {
    if (!str) return '';
    return latexToUnicode(str).replace(/\{([^{}]*)\}/g, '$1');
  }

  // Format author list: "Last, First and First Last and ..." -> "F. Last, F. Last, ..."
  // Highlights "Arne Vogel" by wrapping the formatted name in <strong>.
  function formatAuthors(authorStr) {
    if (!authorStr) return '';
    return authorStr.split(/\s+and\s+/i).map(function (a) {
      a = a.trim();
      if (!a) return '';
      // Normalise to "First Last" for highlight check
      let first, last, formatted;
      if (a.indexOf(',') !== -1) {
        const parts = a.split(',');
        last = parts[0].trim();
        const firsts = parts[1] ? parts[1].trim().split(/\s+/) : [];
        first = firsts[0] || '';
        const initials = firsts.map(function (f) { return f.charAt(0) + '.'; }).join(' ');
        formatted = initials ? initials + ' ' + last : last;
      } else {
        const parts = a.split(/\s+/);
        if (parts.length === 1) return parts[0];
        last = parts[parts.length - 1];
        first = parts[0];
        const initials = parts.slice(0, -1).map(function (f) { return f.charAt(0) + '.'; }).join(' ');
        formatted = initials + ' ' + last;
      }
      if (first.toLowerCase() === 'arne' && last.toLowerCase() === 'vogel') {
        return '<strong>' + esc('Arne Vogel') + '</strong>';
      }
      return esc(formatted);
    }).join(', ');
  }

  function renderEntry(entry) {
    const f = entry.fields;
    const title = stripBraces(f.title || '');
    const author = formatAuthors(stripBraces(f.author || ''));
    const year = f.year || '';
    const doi = f.doi || '';
    const url = f.url || '';

    // Venue depends on entry type
    let venue = '';
    if (entry.type === 'article') {
      venue = stripBraces(f.journal || '');
    } else if (entry.type === 'inproceedings' || entry.type === 'conference') {
      venue = stripBraces(f.booktitle || '');
    } else if (entry.type === 'incollection') {
      venue = stripBraces(f.booktitle || '');
    } else if (entry.type === 'phdthesis') {
      venue = 'PhD thesis, ' + stripBraces(f.school || '');
    } else if (entry.type === 'mastersthesis') {
      venue = "Master's thesis, " + stripBraces(f.school || '');
    } else if (entry.type === 'techreport') {
      venue = 'Technical report, ' + stripBraces(f.institution || '');
    } else if (entry.type === 'misc') {
      venue = stripBraces(f.howpublished || '');
    } else {
      venue = stripBraces(f.publisher || f.journal || f.booktitle || '');
    }

    const li = document.createElement('li');
    li.className = 'bib-entry';
    li.setAttribute('data-bib-key', entry.key);

    const parts = [];
    if (author) parts.push('<span class="bib-author">' + author + '</span>');
    if (title) {
      const titleHtml = (url || doi)
        ? '<a href="' + esc(url || 'https://doi.org/' + doi) + '" target="_blank" rel="noopener">' + esc(title) + '</a>'
        : esc(title);
      parts.push('<span class="bib-title">' + titleHtml + '</span>');
    }
    if (venue) parts.push('<span class="bib-venue">' + esc(venue) + '</span>');
    if (year) parts.push('<span class="bib-year">' + esc(year) + '</span>');
    if (doi && !url) {
      parts.push('<span class="bib-doi"><a href="https://doi.org/' + esc(doi) + '" target="_blank" rel="noopener">DOI: ' + esc(doi) + '</a></span>');
    }

    li.innerHTML = parts.join('. ') + '.';
    return li;
  }

  function esc(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function initBibliography(container) {
    const bibFile = container.getAttribute('data-bib-file') || '/all.bib';
    const keysAttr = container.getAttribute('data-bib-keys') || '';
    const filterKeys = keysAttr
      ? keysAttr.split(',').map(function (k) { return k.trim().toLowerCase(); }).filter(Boolean)
      : [];

    fetch(bibFile)
      .then(function (r) {
        if (!r.ok) throw new Error('Failed to fetch ' + bibFile + ': ' + r.status);
        return r.text();
      })
      .then(function (text) {
        const entries = parseBib(text);
        const toRender = (filterKeys.length
          ? entries.filter(function (e) { return filterKeys.indexOf(e.key.toLowerCase()) !== -1; })
          : entries).slice().sort(function (a, b) {
            return parseInt(b.fields.year || 0, 10) - parseInt(a.fields.year || 0, 10);
          });

        if (toRender.length === 0) {
          container.textContent = 'No bibliography entries found.';
          return;
        }

        const ol = document.createElement('ol');
        ol.className = 'bibliography-list';
        toRender.forEach(function (entry) {
          ol.appendChild(renderEntry(entry));
        });
        container.innerHTML = '';
        container.appendChild(ol);
      })
      .catch(function (err) {
        container.textContent = 'Error loading bibliography: ' + err.message;
      });
  }

  document.querySelectorAll('.bibliography[data-bib-file]').forEach(initBibliography);
})();
